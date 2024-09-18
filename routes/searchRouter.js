import express from 'express';
import searchItems from '../controllers/searchController.js';



const searchRouter = express.Router();


searchRouter.get('/search', searchItems);

export default searchRouter;
