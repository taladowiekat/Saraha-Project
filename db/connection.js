import  mongoose from "mongoose";

const connectdb= ()=>{
    mongoose.connect(process.env.DB)
    .then(
        ()=>{
            console.log("connected successfully")

        })
    .catch(
        (error)=>{
            console.log(error)
        }
    )
}

export default connectdb