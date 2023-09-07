const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const cors=require("cors");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}



const allowedHeaders = ["Authorization", "Content-Type"]; 
const allowedMethods = ["GET", "POST", "PUT", "DELETE"]; 

app.use("*", cors({
   origin:['http://localhost:3000','https://serene-alpaca.netlify.app'],
  credentials: true,
  allowedHeaders, // Include the allowed headers array
  methods: allowedMethods.join(), // Include the allowed methods as a comma-separated string
}));


// app.use(
//   session({
//     secret: "ybjbjbjbjbjbjb", // Replace with your secret key
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//       secure: true, // Set to true for production if using HTTPS
//       maxAge: 3600000, // Session expiration time in milliseconds (1 hour in this example)
//       sameSite: 'none', // Set SameSite attribute to 'none' for cross-origin requests
//     },
//   })
// );

// app.use("*",cors({
//   origin:['http://localhost:3000','https://serene-alpaca.netlify.app'],
//   credentials:true,
// }));

app.use(cookieParser());

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.static(path.join(__dirname, 'build'))); //modify 

app.get('/', function (req, res) {   //modify
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


const post = require("./routes/post");
const user = require("./routes/user");


app.use("/api/v1", post);
app.use("/api/v1", user);
 
// app.use(express.static(path.join(__dirname, "../frontend/build")));

// if(process.env.NODE_ENV==='production')
// { 
//   const path =require('path')
//   app.get("/",(req,res)=>{
//     app.use(express.static(path.resolve(__dirname,'frontend','build')))
//     res.sendFile(path.resolve(__dirname,'frontend','build','index.html'))
//   })

// }
// app.get("*", (req, res) => {
//   // res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
// });

module.exports = app;
