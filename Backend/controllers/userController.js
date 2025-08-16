const pool=require('../config/db')


const getStoreData=async(req, res)=> {
    const [userData]=await pool.promise().query("SELECT * FROM stores")
    res.status(200).json(userData);
}

const getStoreRating=async(req, res)=> {

    const id=req.params.id;
    const [ratindData]=await pool.promise().query("SELECT * FROM ratings WHERE store_id=?",[id])
    res.status(200).json(ratindData);
    // console.log(ratindData);
}


const addRatings = async (req, res) => {
  try {
    const { user_id, store_id, rating, user_name } = req.body;

    const sql = `
      INSERT INTO RATINGS (user_id, store_id, rating, user_name)
      VALUES (?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE rating = VALUES(rating), user_name = VALUES(user_name)
    `;

    const [ratingData] = await pool
      .promise()
      .query(sql, [user_id, store_id, rating, user_name]);

    res.status(200).json({ message: "Rating added or updated" });
  } catch (error) {
    console.error("Error adding/updating rating:", error);
    res.status(500).json({ message: "Database error" });
  }
};

const getAllRatings=async(req, res)=> {
    console.log("hi");
    const [ratindData]=await pool.promise().query("SELECT * FROM ratings")
    res.status(200).json(ratindData);
    // console.log(ratindData);
}



module.exports={getStoreData , getStoreRating, addRatings,getAllRatings};