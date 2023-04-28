const express = require("express")
const bodyParser = require("body-parser")
const session = require("express-session")
const mongoose = require("mongoose")
const passport = require("passport")
const AuthRoute = require('./routes/auth').router
const UserRouter = require("./routes/user").router
const cors = require("cors")
require('dotenv').config()
require('./utils/passport-setup')
const app = express()
app.use(cors());
app.use(bodyParser.json());
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

app.use(cors())


//routes

app.use("/auth", AuthRoute)
app.use("/user", UserRouter)


const PORT =  process.env.PORT  || 5000
const MONGO_URI =process.env.MONGO_URI



mongoose.connect(MONGO_URI, {
    useNewUrlParser: true, 
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

