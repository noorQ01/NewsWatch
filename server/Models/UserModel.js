import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
    default: "https://i.postimg.cc/52SNZ0X8/Profile.jpg",
  },
  userType: {
    type: String,
    default: "user",
  },
});

const UserModel = mongoose.model("users", UserSchema);
export default UserModel;
