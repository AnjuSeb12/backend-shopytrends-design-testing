import express from 'express';
import { cartAdding, cartCount, cartDelete, cartUpdate, cartViewById, clearCart } from '../controllers/cartController.js';
import authenticateUser from '../middlewares/userMiddleware.js';


const cartRouter=express.Router()


cartRouter.post("/addcart/:productId",authenticateUser,cartAdding);
cartRouter.get("/viewbyidcart",authenticateUser,cartViewById);
cartRouter.put("/updatecart/:cartItemId",authenticateUser,cartUpdate);
cartRouter.delete("/cartdelete/:cartItemId",authenticateUser,cartDelete);

cartRouter.delete('/clear',authenticateUser,clearCart)
cartRouter.get('/count',authenticateUser,cartCount)

export default cartRouter;