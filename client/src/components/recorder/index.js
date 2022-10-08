import React, { useState, useEffect } from "react";

import MicRecorder from "mic-recorder-to-mp3";
import { recognizeAudio } from "../../apiCalls";

const Mp3Recorder = new MicRecorder({ bitRate: 256 });
const Recorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [blobURL, setBlobUrl] = useState("");
  const [isBlocked, setIsBlocked] = useState(false);
  const [response, setResponse] = useState(null);
  const formData = new FormData();
  const start = () => {
    if (isBlocked) {
      console.log("Permission Denied");
    } else {
      Mp3Recorder.start()
        .then(() => {
          setIsRecording(true);
        })
        .catch((e) => console.error(e));
    }
  };

  const stop = () => {
    Mp3Recorder.stop()
      .getMp3()
      .then(async ([buffer, blob]) => {
        console.log(blob);
        const blobURL = URL.createObjectURL(blob);

        const audioFile = new File([blob], "recording", { type: ".wav" });
        formData.set("recording", audioFile);
        const lookupResponse = await recognizeAudio(formData);
        if (lookupResponse[0]) setResponse(lookupResponse[1]);

        setBlobUrl(blobURL);
        setIsRecording(false);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    navigator.getUserMedia(
      { audio: true },
      () => {
        console.log("Permission Granted");
        setIsBlocked(false);
      },
      () => {
        console.log("Permission Denied");
        setIsBlocked(true);
      }
    );
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={start} disabled={isRecording}>
          Record
        </button>
        <button onClick={stop} disabled={!isRecording}>
          Stop
        </button>
        <audio src={blobURL} controls="controls" />
        <div style={{ color: "red", fontSize: "3rem", marginTop: "5%" }}>
          {response && response.lookup_status === 1 && "Matched"}
          {response && response.lookup_status === 0 && "Not_Matched"}
        </div>
      </header>
    </div>
  );
};

export default Recorder;
