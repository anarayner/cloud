const fs = require('fs')
const File = require('../models/File')
require('dotenv').config()
const path = require('path');


class FileService{
     createDir(req, file){
         return new Promise((resolve, reject) =>{
             const filePath =  (`${req.filePath}\\${file.user}\\${file.path}`)
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

    createChildDir(req, file){
        return new Promise((resolve, reject) =>{
            console.log(file.path)
            console.log(file)

            const filePath =  (`${req.filePath}\\${file.user}\\${file.path}`)
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

    deleteFile(req, file) {

        if(file.type === 'dir'){
            console.log(file.path)
            fs.rmdirSync(file.path)
        } else {
            fs.unlinkSync(file.path)
        }
    }
    getPath(req, file) {
         const p = file.path
        console.log(p)
        return p
    }
}

module.exports = new FileService()