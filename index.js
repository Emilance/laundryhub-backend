const express = require("express")
const bodyParser = require("body-parser")
const session = require("express-session")
const mongoose = require("mongoose")
const passport = require("passport")
const AuthRoute = require('./Route/auth').router
const cors = require("cors")
const app = express()
require('dotenv').config()
require('./utils/passport-setup')

const MongoStore =  require('connect-mongo')(session);


app.use(
  session({
    secret: 'laundryhub',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({mongooseConnection : mongoose.connection})
  })
);

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
}).then(() => {
    app.listen(PORT , ()=>{
        console.log(`listening on port ${PORT}`)
        const MongoStore =  require('connect-mongo')(session);

       
  
  
      })
}).catch((err) => {
    console.log(err.message + "Errorrrrrrr")
})

