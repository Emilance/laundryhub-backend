const express = require("express")
require('dotenv').config();
const bodyParser = require("body-parser")
const session = require("express-session")
const mongoose = require("mongoose")
<<<<<<< HEAD
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const app = express()
app.use(cors());
=======
const passport = require("passport")
const AuthRoute = require('./Route/auth').router
const cors = require("cors")
const app = express()
require('dotenv').config()
require('./utils/passport-setup')

const MongoStore =  require('connect-mongo')(session);

>>>>>>> e64636a049ffe6a90b3e9c40e9a048ecfc86d862

app.use(
  session({
    secret: 'laundryhub',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({mongooseConnection : mongoose.connection})
  })
);

<<<<<<< HEAD
PORT = 5000

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
=======
//Google auth
app.use(passport.initialize())
app.use(passport.session())
app.use(bodyParser.json());
app.use(cors())


app.use("/auth", AuthRoute)


PORT =  process.env.PORT  || 5000
const MONGO_URI =process.env.MONGO_URI



mongoose.connect(MONGO_URI, {
    useNewUrlParser: true, 
>>>>>>> e64636a049ffe6a90b3e9c40e9a048ecfc86d862
}).then(() => {
    app.listen(PORT , ()=>{
        console.log(`listening on port ${PORT}`)
        const MongoStore =  require('connect-mongo')(session);

       
  
  
      })
}).catch((err) => {
    console.log(err.message + "Errorrrrrrr")
})
<<<<<<< HEAD
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
=======

>>>>>>> e64636a049ffe6a90b3e9c40e9a048ecfc86d862
