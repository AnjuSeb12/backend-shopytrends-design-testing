// import mongoose from "mongoose";

// const productSchema = new mongoose.Schema({
//     title: {
//         type: String,
//         required: true
//     },
//     description: {
//         type: String,
//         required: true
//     },
//     price: {
//         type: Number,
//         required: true

//     },

//     category: {
//         type: String,
//         required: true
//     },
//     subcategory: {
//         type: String,
//         required: true
//     },
//     image: {
//         type: String,
//         required: true
//     },
//     stock: {
//         type: Number,
//         required: true,
//         default: 0,
//     },
//     seller: { type: mongoose.Schema.Types.ObjectId, ref: 'sellers', required: true },
   
// },
//     { timestamps: true }

// )
// const Product = mongoose.model("products", productSchema)
// export default Product;
import mongoose from 'mongoose';

// Define the product schema
const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    subcategory: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true,
        default: 0
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'sellers',
        required: true
    },
    averageRating: {
        type: Number,
        default: 0
    },
    numReviews: {
        type: Number,
        default: 0
    }
}, { timestamps: true });


productSchema.statics.updateReviewStats = async function (productId) {
    try {
        // Convert productId to a mongoose ObjectId
        const objectId = new mongoose.Types.ObjectId(productId);

        const stats = await this.aggregate([
            { $match: { _id: objectId } },
            { $lookup: { from: 'reviews', localField: '_id', foreignField: 'product', as: 'reviews' } },
            { $unwind: { path: '$reviews', preserveNullAndEmptyArrays: true } },
            { $group: { _id: '$_id', averageRating: { $avg: '$reviews.rating' }, numReviews: { $sum: { $cond: [ { $eq: [ '$reviews.rating', null ] }, 0, 1 ] } } } }
        ]);

        if (stats.length > 0) {
            await this.findByIdAndUpdate(productId, {
                averageRating: stats[0].averageRating,
                numReviews: stats[0].numReviews,
            });
        } else {
            await this.findByIdAndUpdate(productId, {
                averageRating: 0,
                numReviews: 0,
            });
        }
    } catch (error) {
        console.error('Error updating review stats:', error);
        throw error; // Optionally rethrow or handle the error as needed
    }
};


const Product = mongoose.model('products', productSchema);
export default Product;
