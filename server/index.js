const express = require("express");
const mongoose = require("mongoose");
const corsMiddleware = require('./middleware/corsMiddleware')
const filePathMiddleware = require('./middleware/filepathMiddleware')
const router = require ('./routers/index');
require('dotenv').config()
const fileUpload = require("express-fileupload");
const path = require('path')

const app = express();
const PORT = process.env.PORT

app.use(fileUpload({}));
app.use(corsMiddleware)
app.use(filePathMiddleware(path.resolve(__dirname, 'files')))
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
