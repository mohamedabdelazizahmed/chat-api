const { findOne } = require('../models/user');
const io = require('../socket');
exports.get_post = async function (req, res) {
  const {message ,receiverId } = req.body;
  let receiver = await User.findOne({id:receiverId});
  const chat = new Chat({
    sender:req.user._id,
    text:message,
    reviver:receiver._id
  });
 let chatData = await chat.save();
 io.getIO().emit("chats",{actions:'create',chat:chatData});
 res.status(201).json({
  message: "The message created Successfully ",
  chat: chatData,
});
  
};
