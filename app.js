import express from 'express';
import userRouter from './routes/userRouter.js';
import sellerRouter from "./routes/sellerRouter.js"
import productRoute from './routes/productRoute.js';
import cors from "cors"

import cookieParser from "cookie-parser";
import cartRouter from './routes/cartRouter.js';
import reviewRouter from './routes/reviewRouter.js';
import categoryRouter from './routes/categoryRouter.js';
import filterRouter from './routes/productFilterRouter.js';
// import paymentRouter from './routes/paymentRoute.js';
import searchRouter from './routes/searchRouter.js';
import orderRouter from './routes/orderRouter.js';





const app=express()
app.use(cors({
    credentials:true,
    origin:true,
}));


app.use(express.json());
app.use(cookieParser())


app.use("/api/v1/user",userRouter);
app.use("/api/v1/seller",sellerRouter);
app.use("/api/v1/product",productRoute);
app.use("/api/v1/orders",orderRouter);
app.use("/api/v1/cart",cartRouter);
app.use("/api/v1/review",reviewRouter);
app.use("/api/v1/category",categoryRouter);
app.use("/api/v1/filter",filterRouter);
app.use("/api/v1/searches",searchRouter);


app.use((err,req,res,next)=> {
    console.log(err.message);
});

export default app;