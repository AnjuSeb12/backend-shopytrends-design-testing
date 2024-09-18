import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
   firstName: {
      type: String,
      required: true,
      maxLength: 50,
    },
    lastName: {
      type: String,
      required: true,
      maxLength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minLength: 3,
      maxLength: 30,
    },

    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    role:{
      type:String,
      required:true
    }
   
   
   
  },
  { timestamps: true }
);


const User = mongoose.model("users", userSchema);

export default User;