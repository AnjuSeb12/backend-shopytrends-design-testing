import Seller from "../models/sellerModel.js"
import bcrypt from "bcrypt"
import { sellerToken } from "../utils/generateToken.js";
const saltRound = 10;


const sellerRegisteration = async (req, res) => {

    const { firstName, lastName, email, password } = req.body;
    const hashedPass = await bcrypt.hash(password, saltRound);

    try {
        const seller = await Seller.create({
            firstName,
            lastName,
            email,
            role: 'seller',
            password: hashedPass

        });
        

        if (!seller) {
            return res.status(400).json({
                success: false,
                message: "Seller Registeration Failed!",
            })
        }
        const token = sellerToken(seller);
        const cookieParams = {
           
            secure: true,
            sameSite:'None',
          
          
        };
        res.cookie("token", token,cookieParams);
        const successMessage = seller.role === 'admin' ? "Admin Registration Successfully Completed!!" : "Seller Registration Successfully Completed!!";
        res.status(201).json({
            success: true,
            message: successMessage,
            seller,
            token,
            isAuthenticated: true,
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })

    }

}
const sellerLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const seller = await Seller.findOne({ email });

        if (!seller) {
            return res.status(404).json({
                success: false,
                message: "User not Found!"

            });
        }
        const isValid = await bcrypt.compare(password, seller.password);
        console.log("isValid", isValid);
        if (!isValid) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials!'
            });
        }
        const token = sellerToken(seller);
        const cookieParams = {
           
            secure: true,
            sameSite:'None',
           
          
        };
        res.cookie("token", token,cookieParams);
        res.status(201).json({
            success: true,
            message: "Loged in Successfully!",
            seller,
            token,
            isAuthenticated: true,
        })

      

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });

    }

}
const getAllSellers = async (req, res) => {


    try {
        const sellers = await Seller.find(); ;

        if (!sellers) {
            return res.status(404).json({
                success: false,
                message: "Users not found!"
            });
        }
        res.status(200).json({
            success: true,
            sellers
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });

    }
}
const getSingleSeller = async (req, res) => {

    try {
        const { id } = req.params;
        const seller = await Seller.findOne({ _id: id });

        if (!seller) {
            return res.status(404).json({
                success: false,
                message: "Users not found"
            });
        }
        res.status(200).json({
            success: true,
            seller
        });



    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })

    }

}
const sellerDelete = async (req, res) => {
    try {
        const { id } = req.params
        const seller = await Seller.findByIdAndDelete(id);
        if (!seller) {
            return res.status(404).json({
                success: false,
                message: "user not found"

            })
        }
        res.status(200).json({
            success: true,
            message: "Deleted User"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })


    }
}
const sellerUpdate = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, email } = req.body;
        const seller = await Seller.findByIdAndUpdate(id, {
            firstName,
            lastName,
            email
        },
            { new: true });

        if (!seller) {
            return res.status(404).json({
                success: false,
                message: "user not found"
            })
        }
        res.status(200).json({
            success: true,
            message: "Updated User",
            seller
        })



    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })

    }
}
const updateSellerProfile = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    const sellerId = req.user.id; // Assuming user ID is set in req.user by authentication middleware

    try {
        const seller = await Seller.findById(sellerId);

        if (!seller) {
            return res.status(404).json({ success: false, message: "Seller not found" });
        }

        // Update fields
        seller.firstName = firstName || seller.firstName;
        seller.lastName = lastName || seller.lastName;
        seller.email = email || seller.email;

        // Only update password if it's provided and hash it
        if (password) {
            const hashedPass = await bcrypt.hash(password, saltRound);
            seller.password = hashedPass;
        }

        await seller.save();

        res.json({ success: true, message: "Profile updated successfully", seller });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
const sellerLogout = async (req, res, next) => {
    try {
        res.clearCookie("token");

        res.json({ success: true, message: "seller logout successfully",isAuthenticated:false });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Internal server error" });
    }
};
export { sellerLogin, sellerRegisteration, getAllSellers, getSingleSeller, sellerUpdate, sellerDelete ,sellerLogout,updateSellerProfile}