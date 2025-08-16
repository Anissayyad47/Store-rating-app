const pool=require('../config/db')

const getStoreData=async(req, res)=> {
    const id=req.params.id;
    const [userData]=await pool.promise().query("SELECT * FROM stores WHERE owner_id=? ",[id])
    res.status(200).json(userData);
    console.log("id ",id);
    
}

module.exports={getStoreData};
