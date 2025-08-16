const express=require('express')
const {addUser,getUserData,getOwnerData,addStore,getStoreData ,getTotalData}=require('../controllers/adminController')

const router=express.Router();

router.post("/addUser",addUser)
router.post("/addStore",addStore)
router.get("/userData",getUserData)
router.get("/storeData",getStoreData)
router.get("/store_ownerData",getOwnerData)
router.get("/total_data",getTotalData)
module.exports=router;