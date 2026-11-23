const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const userModel = require('../models/user.model')



const registerUser = async(req,res) => {
    try{
        const {username,email, password, role = 'user' } = req.body

        const existingUser = await userModel.findOne({
            $or: [
                {username},
                {email}
            ]
        })
        if(existingUser) return res.status(409).json({ message: "User already exists" })

        const saltRounds = 10
        const hash = await bcrypt.hash(password, saltRounds)

        const user = await userModel.create({
            username: username,
            email: email,
            password: hash,
            role
        })

        //# i guess it makes more sense to pass and create a token after logging in successfully
        // const token = jwt.sign({
        //     id: user._id,
        //     role: user.role
        // },process.env.JWT_SECRET)

        // res.cookie('token', token)
        res.status(201).json({
            message: "User has been registered successfully",
            // token,
            user : { 
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        })
    }catch(error){
        res.status(500).json({ message: error.message })
    }
}

const loginUser = async(req,res) => {
    try{
        const { username, email, password } = req.body
        const existingUser = await userModel.findOne({
            $or: [
                {username},
                {email}
            ]
        })

        if(!existingUser) return res.status(401).json({
            message: 'User not found'
        })

        const isPasswordValid = await bcrypt.compare(password, existingUser.password)
        if(!isPasswordValid) return res.status(401).json({ message: 'Password is not correct' })
        
        const token = jwt.sign({
            id: existingUser._id,
            role: existingUser.role
        }, process.env.JWT_SECRET)

        res.cookie('token', token)

        res.status(200).json({
            message: 'User is authorized',
            user: {
                id: existingUser._id,
                role: existingUser.role
            },
            cookie: token
        })

    }catch(error){
        res.status(500).json({ message: error.message })
    }
}

module.exports = { registerUser, loginUser }