import Product from "../models/productModel.js";


const searchFilter= async (req, res) => {
 
    try {
      
      const {query} = req.query;
      const products = await Product.find({
        $or: [
          { title: { $regex: query, $options: 'i' } },
          { description: { $regex: query, $options: 'i' } },
        ],
      });
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
  };
  export default searchFilter;
  
