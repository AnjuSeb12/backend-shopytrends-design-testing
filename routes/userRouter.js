import express from "express"
import { getAllUsers, getSingleUser, updateUserProfile, userDelete, userLogin,userLogout,userRegisteration} from "../controllers/userController.js";
import authenticateUser from "../middlewares/userMiddleware.js";
import User from "../models/userModel.js";



const userRouter = express.Router()
userRouter.get("/check-user", authenticateUser, async (req, res) => {
    const userId = req.user.id;
  
    // console.log("data", user.data);
    // const findUser = await User.findOne({ email: user.data });
    const findUser = await User.findById(userId);
  
    if (!findUser) {
      return res.json({ message: "authentication failed", success: false });
    }
    
    res.json({ message: "authenticateUser", success: true });
  });


userRouter.post("/signup",userRegisteration)
userRouter.post("/login",userLogin)
userRouter.get("/users",getAllUsers)
userRouter.get("/user/:id",getSingleUser)
userRouter.delete("/userdelete/:id",userDelete)
userRouter.put("/userupdate",authenticateUser,updateUserProfile)
userRouter.post("/logout",userLogout)




export default userRouter;
