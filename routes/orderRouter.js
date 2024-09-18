import express from "express"
import { getAllOrders, cancelOrder, cancelPayment, orderUser, orderAdding, orderDelete, orderViewById,verifyPayment} from "../controllers/orderController.js"
import authenticateUser from "../middlewares/userMiddleware.js";






const orderRouter=express.Router()


orderRouter.post('/add', authenticateUser, orderAdding);


orderRouter.post('/verify-payment', authenticateUser, verifyPayment);
orderRouter.get('/orderuser',authenticateUser,orderUser)
orderRouter.post('/ordercancel/:orderId',authenticateUser,cancelOrder)


orderRouter.get('/allorders',getAllOrders);


orderRouter.get('/:orderId', authenticateUser, orderViewById);


orderRouter.delete('/order/:orderId', authenticateUser, orderDelete);

orderRouter.post('/cancel',cancelPayment)






export default orderRouter