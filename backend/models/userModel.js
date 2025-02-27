import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  address:String,
  createdMemes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Meme' }]
});

const User = mongoose.model('User', userSchema);
export default User;