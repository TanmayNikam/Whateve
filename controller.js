const BASE_URL = require("./utils")
const axios = require("axios")
const FormData = require("form-data")
const Blob  = require("blob")
const fs = require("fs")

exports.initializeDatabase = async (req, res)=>{
    try{
        await axios.post(BASE_URL+"/acr/init-db",{},{
            headers: {
                Auth: "5ac835798aa493440692c54c7ab76161f06c1b88" 
            }
        })
        res.status(200).json({
            success: true,
            message: "Database initialized"
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: err
        })
    }
}

exports.addAudioFile = async(req, res)=>{
    try{
        const data = new FormData()
        const blob = new Blob([JSON.stringify({
            "key_content_id": 1,
          })], {
          type: 'application/json'
        })
        data.append("metadata", blob)
        onsole.log("GG")
        data.append("audioFile", fs.createReadStream("./sample_audio.wav"))
        await axios.post(BASE_URL+"/acr/add-file",data,{
            headers: {
                Auth: "5ac835798aa493440692c54c7ab76161f06c1b88" ,
                "Content-Type": "multipart/form-data"
            }
        })

    }catch(err){
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: err
        })
    }
}