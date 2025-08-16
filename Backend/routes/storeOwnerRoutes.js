const express= require('express');
const {getStoreData } =require('../controllers/storeOwnerController');


const router=express.Router();

router.get("/storeData/:id",getStoreData)

module.exports=router;