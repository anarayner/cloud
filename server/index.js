const express = require("express");
const mongoose = require("mongoose");
const corsMiddleware = require('./middleware/corsMiddleware')
const router = require ('./routers/index');
require('dotenv').config()


const app = express();
const PORT = process.env.PORT

app.use(corsMiddleware)
app.use(express.json());
app.use('/api', router);

const start = async () =>{
  try{
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }, ()=>console.log(`MongoDB connected`) )
    await app.listen(PORT, ()=> console.log(`Server started on ${PORT}`))

  }catch(e){
    console.log(e.message)
  }
}
start();
