import Category from "../models/categoryModel.js";



const addCategory = async (req, res) => {
  try {
  
    const { name,subcategories } = req.body;
    const category = new Category(
        { name,subcategories }
    );
    const categoryCreated = await category.save();
    res.status(201).json({
      success: true,
      message: 'Category added successfully',
      category: categoryCreated,
    });
  } catch (error) {
    console.error('Error adding category:', error);
    res.status(500).json({ success: false, message: 'Failed to add category' });
  }
};


const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({
      success: true,
      categories,
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch categories' });
  }
};


const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    res.status(200).json({
      success: true,
      message: 'Category deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ success: false, message: 'Failed to delete category' });
  }
};

export { addCategory, getCategories, deleteCategory };
