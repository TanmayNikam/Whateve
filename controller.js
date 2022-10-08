const BASE_URL = require("./utils")
const axios = require("axios")


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