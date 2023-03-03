const express = require("express");
const authRoute = require("./routes/authRoute");
const chatRoute = require("./routes/chatRoute");
const auth = require("./middleware/auth.js")();
const mongoose = require("mongoose");
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./models/user");
const bodyParser = require("body-parser");
const app = express();




app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(auth.initialize());
// Passport Config
passport.use(new localStrategy(User.authenticate()));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(authRoute);
app.use(chatRoute);

mongoose.connect(
  `mongodb+srv://mohamedabdelaziz:01282434860m@application-api.ctmzm.mongodb.net/chat-api?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
).then(()=>{
  const server = app.listen(3001 ,()=>console.log("Server Started at 3001"));
  const io = require('./socket').init(server);
  
  io.on("connection" ,socket =>{
    console.log("client connect");
  });
});

