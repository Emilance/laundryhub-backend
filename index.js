const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")


const app = express()


app.use(bodyParser.json())

PORT = 5000
const MONGO_URL = "mongodb+srv://emibrandlance:emibrandlance@cluster0.jcqf7hv.mongodb.net/?retryWrites=true&w=majority"



mongoose.connect(MONGO_URL, {
    useNewUrlParser: true, 
}).then(() => {
    app.listen(PORT , ()=>{
        console.log(`listening on port ${PORT}`)
    })
}).catch((err) => {
    console.log(err.message + "Errorrrrrrr")
})
