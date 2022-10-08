const express = require("express")

const app = express()

app.use(express.json())

app.get("/", (req, res)=>{
    return res.json({
        'success': true,
        'data' : [1,2,3,4]
    })
})

app.listen(8000, ()=>{
    console.log("Server started")
})