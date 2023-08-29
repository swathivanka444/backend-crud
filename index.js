const express = require('express');
const mongoose = require('mongoose')
const dotenv = require("dotenv")
const cors = require('cors');
const app = express();

//add schema
const tasks = require("./models/taskSchema");

//add router
const router = require("./routes/router")

dotenv.config();
app.use(cors());
// const corsOptions = {
//     origin: 'http://localhost:3000',
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true, // If you need to send cookies or authentication headers
//   };
  
// app.use(cors(corsOptions));


app.use(express.json());
app.use(router);




//  mongoose.connect('mongodb://localhost:27017/test', {
//     useNewUrlParser: true,
// }).

const PORT=4200

mongoose.connect(process.env.Database).then(()=>{
    console.log('Database connection Done')
}).catch((err)=>{
    console.log(err)
})



app.listen(PORT,()=>{console.log('port listening in',PORT)});