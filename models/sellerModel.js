import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema(
  {
   firstName: {
      type: String,
      required: true,
      maxLength: 50,
    },
    lastName: {
      type: String,
      required:true,
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
     role: {
      type: String,
      enum: ["seller", "admin"],
    },
    
   
   
  },
  { timestamps: true }
);


const Seller = mongoose.model("sellers", sellerSchema);

export default Seller;
