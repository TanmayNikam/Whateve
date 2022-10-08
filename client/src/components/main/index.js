import React from "react";
import "./styles.css";
import { MdOutlineCloudUpload } from "react-icons/md";
import { uploadFile } from "../../apiCalls";

const Main = () => {
  const fileHandler = async (event) => {
    const formData = new FormData();
    formData.set("mediaFile", event.target.files[0]);
    console.log(formData);
    // uploadFile(formData);
  };

  return (
    <div className="form-class">
      <form>
        <label htmlFor="file-input" className="upload-button">
          Upload the audio file
          <MdOutlineCloudUpload size={30} className="upload-icon" />
        </label>
        <input
          type="file"
          accept=".wav,.mp3"
          id="file-input"
          onChange={fileHandler}
        />
      </form>
    </div>
  );
};

export default Main;
