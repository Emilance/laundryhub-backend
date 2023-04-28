const express = require("express")
require('dotenv').config();
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const app = express()
app.use(cors());

app.use(bodyParser.json())

PORT = 5000

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT , ()=>{
        console.log(`listening on port ${PORT}`)
    })
}).catch((err) => {
    console.log(err.message + "Errorrrrrrr")
})
app.get('/', (req, res) => {
    res.render('Hello World!');
  });
app.get('/signup', (req, res) => {
    res.render('register');
  })
app.post('/login', (req, res) => {
    res.render('login');
  })
  

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
