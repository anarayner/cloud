const Router = require('express')
const authRouter = require('./authRouter')
const fileRouter = require('./fileRouter')

const router = new Router()

router.use('/auth', authRouter)
router.use('/files', fileRouter)

module.exports = router;
