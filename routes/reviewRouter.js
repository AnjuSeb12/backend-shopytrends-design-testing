import express from "express";
import {reviewAdding, getReview } from "../controllers/reviewController.js";
import authenticateUser from "../middlewares/userMiddleware.js";
import authenticateAdmin from "../middlewares/adminMiddleware.js"



const reviewRouter=express.Router();


reviewRouter.post('/product/:productId',authenticateUser,reviewAdding)
reviewRouter.get('/product/:productId',getReview)



export default reviewRouter;
