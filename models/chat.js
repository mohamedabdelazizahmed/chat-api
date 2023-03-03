const mongoose = require("mongoose");
const chatSchema = new mongoose.Schema({
  sender: {
    type:Schema.Types.ObjectId,
    ref:'User',
    required:true
  },
  text: String,
  receiver: {
    type:Schema.Types.ObjectId,
    ref:'User',
    required:true
  },
});
module.exports = mongoose.model("Chat", chatSchema);
