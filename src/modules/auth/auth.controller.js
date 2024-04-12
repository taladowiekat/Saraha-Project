import userModel from "../../../db/model/User.model.js";

import bcrypt from 'bcryptjs'

import jwt from 'jsonwebtoken'

import sendEmail from "../../utils/sendEmail.js";

export const signup =async (req,res)=>{
    const {userName,email,password} = req.body;

    const user =await userModel.findOne({email: email})

    if(user)return res.status(409).json({message : "user already exists"});

    const hashpassword = await bcrypt.hash(password,parseInt(process.env.SALTROUND))

    const newUser = await userModel.create({userName , email, password:hashpassword})

    if(!newUser)return res.json({message : "error creating user"});

    const token = await jwt.sign({email} , process.env.CONFEMAILTOKEN)

    const refreshToken = await jwt.sign({email} , process.env.CONFEMAILTOKEN,{expiresIn:60*60*24})

    sendEmail(email, "welcome to my world" , token)

    return res.status(201).json({message : newUser});

}


export const login =async (req,res)=>{
    const {email,password} = req.body;

    const user =await userModel.findOne({email: email}).select('userName password confirmEmail')

    if(!user) { return res.json({message : "user email not exists"});}

    if(!user.confirmEmail) { return res.json({message : "please confirm your email"})};

    const match = await bcrypt.compare(password,user.password);

    if(!match) {return res.json({message : "invalid password"});}

    const token = jwt.sign({id:user._id},process.env.LOGINSIG,{expiresIn:'1h'})

    return res.json({message : "success" , token});

}

export const confirmEmail = async (req, res) => {
    const { token } = req.params;

    try {
        const decoded = jwt.verify(token, process.env.CONFEMAILTOKEN);

        const user = await userModel.findOneAndUpdate(
            { email: decoded.email },
            { confirmEmail: true },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if the user's email was confirmed successfully
        if (user.confirmEmail) {
            // Return JSON response if needed
            return res.json({ message: "Email is confirmed", user });
        } else {
            return res.status(500).json({ message: "Failed to confirm email" });
        }
    } catch (error) {
        // Handle token verification error
        return res.status(400).json({ message: "Invalid or expired token" });
    }
}
