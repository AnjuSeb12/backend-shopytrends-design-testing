import express from "express";
import { getAllSellers, getSingleSeller, sellerDelete,sellerLogin,sellerLogout,sellerRegisteration, updateSellerProfile } from "../controllers/sellerController.js";
import authenticateAdmin from "../middlewares/adminMiddleware.js";
import authenticateSeller from "../middlewares/sellerMiddleware.js";
import Seller from "../models/sellerModel.js";



const sellerRouter=express.Router();
sellerRouter.get("/check-user", authenticateSeller, async (req, res) => {
    const sellerId = req.user.id;
  
    
    const findSeller = await Seller.findById(sellerId);
  
    if (!findSeller) {
      return res.json({ message: "authentication failed", success: false });
    }
    
    res.json({ message: "authenticateSeller", success: true });
  });





sellerRouter.post("/sellersignup",sellerRegisteration);
sellerRouter.post("/sellerlogin",sellerLogin);
sellerRouter.get("/sellers",getAllSellers);
sellerRouter.get("/sellerbyid/:id",getSingleSeller);
sellerRouter.delete("/deleteseller/:id",authenticateSeller,sellerDelete);
sellerRouter.put("/sellerupdate",authenticateSeller,updateSellerProfile);
sellerRouter.post("/logout",authenticateSeller,sellerLogout);

export default sellerRouter;