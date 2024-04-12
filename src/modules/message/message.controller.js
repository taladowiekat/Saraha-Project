// message.controller.js
import messageModel from "../../../db/model/Message.model.js";
import userModel from "../../../db/model/User.model.js";

export const getMessages = async (req, res) => {
    const messageList =await messageModel.find({receiverId:req.user.id})
    return res.json({ messages: messageList})

}

export const sendMessage = async (req, res) => {
    const { receiverId } = req.params;
    const { message } = req.body;

    const user = await userModel.findById(receiverId);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const createMessage = await messageModel.create({ content: message, receiverId });

    return res.status(200).json({ message: "success", createMessage });
}
