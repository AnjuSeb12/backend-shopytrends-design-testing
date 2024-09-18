import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
   user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        require: true
    },
    cartItems: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "products",
                require: true
            },
            quantity: {
                type: Number,
                required:true,
                default:1
            
            },
           
                 
            price:{
                type:Number,
                required:true,

            },
            
            
            totalPrice:{
                type:Number,
                required:true,

            }
            
        }
    ], 
    
},
{ timestamps: true }

)
const Cart = mongoose.model("cart",cartSchema)
export default Cart;