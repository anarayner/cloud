const File = require('../models/File')
const User = require ('../models/User');
const fileService = require('../services/fileService')
const fs = require('fs')
require('dotenv').config()


class FileController{
    async createDir(req, res) {
        try {
            const {name, type, parent} = req.body
            const file = new File ({name, type, parent, user: req.user.id})
            const parentFile = await File.findOne ({_id: parent})

            if(!parentFile){
                console.log(file)
                file.path = name
                await fileService.createDir(req, file).then(p => file.path = p)
            }else {
                file.path = `${parentFile.path}\\${file.name}`
                await fileService.createChildDir(req, file).then(p => file.path = p)
                parentFile.children.push(file._id)
                await parentFile.save()
            }
            await file.save()
            return res.json(file)
        } catch (e) {
            console.log (e)
            return res.status (400).json (e)
        }
    }
    
    async fetchFiles(req, res){
        try{
            const {sort} = req.query
            let files
            switch (sort){
                case 'name':
                    files = await File.find({user: req.user.id, parent: req.query.parent}).sort({name:1})
                    break;
                case 'type':
                    files = await File.find({user: req.user.id, parent: req.query.parent}).sort({type:1})
                    break;
                case 'data':
                    files = await File.find({user: req.user.id, parent: req.query.parent}).sort({data:1})
                    break;
                default:
                    files = await File.find({user: req.user.id, parent: req.query.parent})
                break;
            }
            console.log(req.user.id)

            return res.json(files)
        }catch   {
            return res.status (500).json ({message: 'Can not get files'})
        }
    }

    async uploadFiles(req, res){
        try{
            console.log(req.files)
            console.log(req.body)

            const file = req.files.file

            const parent = await File.findOne({user: req.user.id, _id: req.body.parent})
            const user = await User.findOne({_id: req.user.id})

            if(user.usedSpace + file.size > user.diskSpace){
                return res.status (400).json ({message: 'There is no space on the disk'})
            }
            user.diskSpace = user.usedSpace + file.size
            let path
            if(parent){
                path = (`${req.filePath}\\${user._id}\\${parent.path}\\${file.name}`)
            } else {
                path = (`${req.filePath}\\${user._id}\\${file.name}`)
            }
            if(fs.existsSync(path)){
                return res.status (400).json ({message: 'File already exist'})
            }
            await file.mv (path)
            const type = file.name.split('.').pop()

            const dbFile = new File({
                name: file.name,
                type,
                size: file.size,
                path,
                parent: parent ? parent?._id : null,
                user: user._id
            })

            await dbFile.save()
            await user.save()

            return res.json(dbFile)
        }catch   {
            return res.status (500).json ({message: 'Upload ..Error'})
        }
    }
    
    async downloadFile(req, res){
        try{
            const file = await File.findOne({_id: req.query.id, user: req.user.id})
            console.log(file)
            const path = file.path
            console.log(path)
            console.log(fs.existsSync(path))

            if(fs.existsSync(path)){
                return res.download(path, file.name)
            }
            return res.status (500).json ({message: 'Download Error'})

        } catch (e) {
            return res.status (500).json ({message: 'Download Error'})

        }
    }

    async deleteFile(req, res){
        try{
            console.log(req.query.id)
            const file = await File.findOne({_id: req.query.id, user: req.user.id})
            console.log(file)
            if(!file){
                return res.status (500).json ({message: 'File not found'})
            }
             fileService.deleteFile(req, file)
            await file.remove()
            return res.json ({message: 'File was deleted'})
        } catch (e) {
            return res.status (400).json ({message: 'File not empty'})

        }
    }

    async searchFiles(req, res){
        const searchName = req.query.search
        let files = await File.find({user: req.user.id})
        files = files.filter(file => file.name.includes(searchName))
        return res.json(files)
        try{

        }catch (e) {
            return res.status (400).json ({message: 'Search error'})
        }
    }
}

module.exports = new FileController()