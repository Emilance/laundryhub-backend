const express = require("express")
const bodyParser = require("body-parser")
const session = require("express-session")
const mongoose = require("mongoose")
const passport = require("passport")
const AuthRoute = require('./routes/auth').router
const UserRouter = require("./routes/user").router
const BookingRouter = require("./routes/bookings").router

const cors = require("cors")
const app = express()
app.use(cors());

require('dotenv').config()
require('./utils/passport-setup')



app.use(bodyParser.urlencoded({ extended : true}))
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



//routes

app.use("/auth", AuthRoute)
app.use("/user", UserRouter)
app.use("/booking", BookingRouter)



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
    res.send('Hello World!');
  });

