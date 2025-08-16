const express= require('express');
const {getStoreData ,getStoreRating,addRatings ,getAllRatings} =require('../controllers/userController')

const router=express.Router();

router.get('/storeData',getStoreData);
router.get('/ratingData/:id',getStoreRating);
router.post('/addRatings',addRatings);
router.get('/ratingDataAll',getAllRatings);
module.exports=router;
