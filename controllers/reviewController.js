

import Product from '../models/productModel.js';
import Review from "../models/reviewModel.js";
import Order from "../models/orderModel.js";



export const reviewAdding = async (req, res) => {
    console.log("....reviewadding");
    console.log(req.body);

    const userId = req.user.id; 
    const { rating, comment } = req.body;
    const { productId } = req.params;

    console.log("User ID:", userId);
    console.log("Product ID:", productId);

    try {
        
        const order = await Order.findOne({
            user: userId,
            'orderItems.productId': productId,
            paymentStatus: 'Paid'
        }).populate('orderItems.productId');

        console.log("Order:", order);

        if (!order) {
            return res.status(403).json({ success: false, message: 'You must purchase the product before leaving a review.' });
        }

        
        const review = await Review.create({ product: productId, user: userId, rating, comment });
        console.log("Review Created:", review);

        
        await Product.updateReviewStats(productId);

        res.status(201).json({ success: true, review });
    } catch (error) {
        console.error("Error submitting review:", error);
        res.status(400).json({ success: false, message: error.message });
    }
};


export const getReview = async (req, res) => {
    try {
        console.log("hityedgetreview")
    
    const { productId } = req.params;

   
        const reviews = await Review.find({ product: productId })
            .populate('user', 'name') 
            .sort({ createdAt: -1 }); 

        res.status(200).json({ success: true, reviews });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};


