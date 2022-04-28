const fs = require('fs')
const File = require('../models/File')
require('dotenv').config()
const path = require('path');


class FileService{
     createDir(file){
         return new Promise((resolve, reject) =>{
             console.log('filePath1')
             const filePath =  (`${process.env.FILE_PATH}\\${file.user}\\${file.path}`)
             console.log(filePath)
             try{
                 if(!fs.existsSync(filePath)){
                     console.log('filePath2')
                     fs.mkdirSync(filePath)
                     return resolve({message: 'File was created'})
                 }else {
                     return reject({message: 'File already exist'})
                 }
             }catch (e) {
                 return reject({message: 'File Error'})
             }
         })
     }
}

module.exports = new FileService()