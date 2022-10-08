const express = require("express")
const cors = require("cors")
const acr = require("./router")
const app = express()


app.use(express.json())
app.use(cors())

app.use("/acr", acr)

app.listen(8000, '0.0.0.0', ()=>{
    console.log("Server started")
})