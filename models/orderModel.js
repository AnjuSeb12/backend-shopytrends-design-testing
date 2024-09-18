import mongoose from 'mongoose';


const orderItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',  
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
}, { _id: false }); 


const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',  
        required: true,
    },
    orderItems: [orderItemSchema],  
    shippingAddress: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true },
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Paid','Canceled','Delivered'],
        default: 'Pending',
    },
}, { timestamps: true });  


const Order = mongoose.model('Order', orderSchema);
export default Order;
