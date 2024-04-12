import jwt from "jsonwebtoken";
import userModel from "../../db/model/User.model.js";

const auth = async (req, res,next) => {
    const {authorization} = req.headers;
    if (!authorization.startsWith(process.env.BEARERKEY))
    {
        return res.json({message:"Invalid authorization"})
    }

    const token = authorization.split(process.env.BEARERKEY)[1];
    // return res.json(token)
    const decoded =await jwt.verify(token , process.env.LOGINSIG)
    // return res.json(decoded)
    // req.id = decoded.id;
    const authUser= await userModel.findById(decoded.id).select('userName')
    req.user = authUser
    next();
}
export default auth