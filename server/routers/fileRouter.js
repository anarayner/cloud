const Router = require("express");
require('dotenv').config()
const FileController = require('../controllers/FileController');
const authMiddleware = require('../middleware/auth.middleware')

const router = new Router
router.post('', authMiddleware, FileController.createDir)
router.get('', authMiddleware, FileController.fetchFiles)
router.post('/upload', authMiddleware, FileController.uploadFiles)
router.get('/download', authMiddleware, FileController.downloadFile)
router.delete('/', authMiddleware, FileController.deleteFile)
router.get('/search', authMiddleware, FileController.searchFiles)


module.exports = router
