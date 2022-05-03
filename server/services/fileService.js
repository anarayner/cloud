const fs = require('fs')
const File = require('../models/File')
require('dotenv').config()
const path = require('path');


class FileService{
     createDir(file){
         return new Promise((resolve, reject) =>{
             const filePath =  (`${process.env.FILE_PATH}\\${file.user}\\${file.path}`)
             console.log(filePath)
             try{
                 if(!fs.existsSync(filePath)){
                     fs.mkdirSync(filePath)
                     return resolve(filePath)
                 }else {
                     return reject({message: 'File already exist'})
                 }
             }catch (e) {
                 return reject({message: 'File Error'})
             }
         })
     }

    createChildDir(file){
        return new Promise((resolve, reject) =>{
            const filePath =  file.path
            console.log(filePath)
            try{
                if(!fs.existsSync(filePath)){
                    fs.mkdirSync(filePath)
                    return resolve(filePath)
                }else {
                    return reject({message: 'File already exist'})
                }
            }catch (e) {
                return reject({message: 'File Error'})
            }
        })
    }

    deleteFile(file) {

        if(file.type === 'dir'){
            console.log(file.path)
            fs.rmdirSync(file.path)
        } else {
            fs.unlinkSync(file.path)
        }
    }
    getPath(file) {
         const p = file.path
        console.log(p)
        return p
    }
}

module.exports = new FileService()