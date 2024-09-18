import express from 'express';
import { addCategory, getCategories, deleteCategory } from '../controllers/category.js';

const categoryRouter = express.Router();


categoryRouter.post('/addcategory', addCategory);


categoryRouter.get('/categories', getCategories);


categoryRouter.delete('/deletecategory/:id', deleteCategory);

export default categoryRouter;
