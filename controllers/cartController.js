import Cart from "../models/cartModel.js";
import User from "../models/userModel.js";
import Product from "../models/productModel.js";





const cartAdding = async (req, res) => {
  try {
    const userId = req.user.id;
    const {productId}=req.params;
    const { quantity} = req.body;



    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    // Check if there's enough stock 

    if (product.stock < quantity) {
      return res.status(400).json({ message: 'Insufficient stock available' });
    }


    let cart = await Cart.findOne({ user: userId });


    if (!cart) {
      cart = new Cart({ user: userId, cartItems: [] });
    }


    const cartItem = cart.cartItems.find(item => item.product.toString() === productId);

    if (cartItem) {
      if (product.stock <cartItem.quantity + quantity) {
        return res.status(400).json({ message: 'Insufficient stock available' });
      }

      cartItem.quantity += Number(quantity);
      cartItem.totalPrice = cartItem.quantity * cartItem.price;
    } else {

      cart.cartItems.push({ product: productId, price:product.price*quantity,quantity, totalPrice: product.price * quantity });
    }

    // Decrease the product's stock
    product.stock -= quantity;
    await product.save();

    await cart.save();
    

    res.status(201).json({
      message:"Added cart items",
      cart
    });
  } catch (error) {

    res.status(400).json({ message: error.message });
  }
};



const cartViewById = async (req, res) => {
  try {
   
    const userId  = req.user.id;
  



    const cartviewbyid = await Cart.findOne({ user: userId }).populate('cartItems.product');

    if (!cartviewbyid) {
      return res.status(404).json({
        success: false,
        message: "Cart not found"

      });
    }
    res.status(200).json({
      success: true,
      message: "Success",
      cartviewbyid
    })


  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })

  }
}
const cartUpdate = async (req, res) => {
  try {
      const userId = req.user.id;
      const { cartItemId } = req.params;
      const { quantity } = req.body;

      if (quantity <= 0) {
          return res.status(400).json({ message: 'Quantity must be greater than zero' });
      }

      const cart = await Cart.findOne({ user: userId });
      if (!cart) {
          return res.status(404).json({ message: 'Cart not found' });
      }

      const cartItem = cart.cartItems.id(cartItemId);
      if (!cartItem) {
          return res.status(404).json({ message: 'Cart item not found' });
      }

      const product = await Product.findById(cartItem.product);
      if (!product) {
          return res.status(404).json({ message: 'Product not found' });
      }

      const stockChange = quantity - cartItem.quantity;
      if (product.stock < stockChange) {
          return res.status(400).json({ message: 'Insufficient stock available' });
      }

      cartItem.quantity = quantity;
      cartItem.totalPrice = quantity * product.price;

      product.stock -= stockChange;
      await product.save();
      await cart.save();
      

      res.status(200).json({ cartItem }); 
  } catch (error) {
      console.error("Error updating cart:", error.message);
      res.status(500).json({ message: 'Server error' });
  }
};









const cartDelete = async (req, res) => {
  try {
    const userId=req.user.id;
    const { cartItemId } = req.params;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const itemIndex = cart.cartItems.findIndex(item => item._id.toString() === cartItemId);
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    const cartItem = cart.cartItems[itemIndex];

   
    const product = await Product.findById(cartItem.product);
    product.stock += cartItem.quantity;
    await product.save();

    cart.cartItems.splice(itemIndex, 1);
    await cart.save();

    res.status(200).json({
      success: true,
      message: "Deleted requested cart item",
      cart
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};




const clearCart = async (req, res) => {
  try {
      const userId = req.user.id; 

      
      const cart = await Cart.findOne({ user: userId });

      if (!cart) {
          return res.status(404).json({ message: 'Cart not found' });
      }

     
      cart.cartItems.forEach(async (cartItem) => {
          const product = await Product.findById(cartItem.product);
          if (product) {
              product.stock += cartItem.quantity;
              await product.save(); 
          }
      });

     
      cart.cartItems = [];

      await cart.save();

      res.status(200).json({
          success: true,
          message: "Cart has been cleared successfully, and stock has been updated",
          cart
      });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

const cartCount= async (req, res) => {
  try {
    const userId = req.user.id; 
    const cart = await Cart.findOne({ user: userId });
    const cartCount = cart ? cart.cartItems.length : 0;
    res.json({ cartCount });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart count' });
  }
};





export { clearCart,cartDelete, cartAdding, cartViewById, cartUpdate,cartCount }