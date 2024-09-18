import express from 'express';

import searchFilter from '../controllers/productFilter.js';



const filterRouter = express.Router();

filterRouter.get('/search', searchFilter);

export default filterRouter;
