const {validationResult} = require ('express-validator');
const User = require ('../models/User');
const bcrypt = require ('bcryptjs');
const jwt = require ('jsonwebtoken');
const fs = require ('fs');
const path = require ('path');
require('dotenv').config()
const fileService = require('../services/fileService')
const File = require('../models/File')



class AuthController {
    async registration(req, res, next) {
        try {
            const errors = validationResult (req);
            if (!errors.isEmpty ()) {
                return res.send ({message: "Incorrect request", errors});
            }
            const {email, password} = req.body;
            console.log (email);
            const candidate = await User.findOne ({email});
            console.log (candidate);

            if (candidate) {
                return res.status (400)
                    .json ({message: `User with the email ${email} already exist`})}
            const hashPassword = await bcrypt.hash (password, 1);
            const user = new User ({email, password: hashPassword});
            console.log (user)
            // await fs.mkdir(path.join(__dirname, 'test'), (err) => {
            //     if (err) {
            //         return console.error(err);
            //     }
            //     console.log('Directory created successfully!');
            // });
            await fileService.createDir(new File({user: user.id, name:''}))
            console.log ('user')

            await user.save ();
            return res.json (user);
        } catch (e) {
            console.log (e);
            res.send ({message: "Server error"});
        }
    }
    async login(req, res, next) {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: "User not founded" });
            }
            const isPassValid = bcrypt.compareSync(password, user.password);
            if (!isPassValid) {
                return res.status(400).json({ message: "Invalid password" });
            }
            const token = jwt.sign(
                { id: user.id },
                process.env.JWT_SECRET, {expiresIn: '3d'}
            );
            return res.json({token, user});
        } catch (e) {
            console.log(e);
            res.send({ message: "Server error" });
        }}
    async auth(req, res, next) {
        try {
            const user = await User.findOne({_id: req.user.id})
            const token = jwt.sign(
                { id: user.id },
                process.env.JWT_SECRET, {expiresIn: '3d'}
            );
            return res.json({token, user});
        } catch (e) {
            console.log(e);
            res.send({ message: "Server error" });
        }}

}

module.exports = new AuthController()