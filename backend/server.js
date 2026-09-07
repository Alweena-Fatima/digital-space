const express=require("express"); //framework to create server and apis
const mongoose=require("mongoose");//connect to db
const cors=require("cors"); //controls is one website can access data from another 

const app=express();//create express application   

app.use(cors());
app.use(express.json());



mongoose.connect("mongodb+srv://MeowMeow:8gbuY3TgsZ1yJy2C@cozyproject.ohwybb9.mongodb.net/");

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
const roomRoutes = require("./routes/roomRoutes");

app.use("/api/room", roomRoutes);