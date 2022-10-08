const BASE_URL = require("./utils");
const axios = require("axios");
const FormData = require("form-data");
const Blob = require("node-blob");
const fs = require("fs");
const formidable = require("formidable");
const { v4: uuidv4 } = require("uuid");

exports.initializeDatabase = async (req, res) => {
  try {
    await axios.post(
      BASE_URL + "/acr/init-db",
      {},
      {
        headers: {
          Auth: "5ac835798aa493440692c54c7ab76161f06c1b88",
        },
      }
    );
    res.status(200).json({
      success: true,
      message: "Database initialized",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err,
    });
  }
};

exports.addAudioFile = async (req, res) => {
  try {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    const newId = uuidv4();
    form.parse(req, async (err, fields, files) => {
      if (err) console.log(err);
      if (files.mediaFile) {
        fs.writeFileSync(
          `audio_${newId}.wav`,
          fs.readFileSync(files.mediaFile.originalFilename)
        );
      }

      const data = new FormData();
      const blob = new Blob(
        [
          JSON.stringify({
            key_content_id: "1",
          }),
        ],
        {
          type: "application/json",
        }
      );
      data.append("metadata", JSON.stringify(blob));
      data.append("audioFile", fs.createReadStream(`./audio_${newId}.wav`));
      const response = await axios.post(BASE_URL + "/acr/add-file", data, {
        headers: {
          Auth: "5ac835798aa493440692c54c7ab76161f06c1b88",
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
      res.status(200).json({
        success: true,
        message: "Audio Uploaded",
      });
    });
  } catch (err) {
    // console.log(err);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err,
    });
  }
};

exports.findAudioFile = async (req, res) => {
  try {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    const newId = uuidv4();
    var file = await new Promise(function (resolve, reject) {
      form.parse(req, function (err, fields, files) {
        if (err) {
          reject(err);
          return;
        }
        resolve(files.recording);
      }); // form.parse
    });
    fs.writeFileSync(`./audio_${newId}.wav`, fs.readFileSync(file.filepath));
    var data = new FormData();
    data.append("audioFile", fs.createReadStream(`./audio_${newId}.wav`));
    var config = {
      method: "post",
      url: "https://codelikeada.lgads.tv/acr/lookup-file",
      headers: {
        Auth: "5ac835798aa493440692c54c7ab76161f06c1b88",
        "Content-Type": "multipart/form-data",
      },
      data: data,
    };
    const response = await axios.post(
      "https://codelikeada.lgads.tv/acr/lookup-file",
      data,
      {
        headers: {
          Auth: "5ac835798aa493440692c54c7ab76161f06c1b88",
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(response.data);
    res.json(response.data);
  } catch (error) {
    console.log(error);
  }
};
