const express=require('express')
const cors=require('cors')
const authRoutes = require('./routes/authRoutes.js')
const adminRoutes = require('./routes/adminRoutes.js')
const userRoutes = require('./routes/userRoutes.js')
const storeOwnerRoutes = require('./routes/storeOwnerRoutes.js')

const app=express();
app.use(cors())
app.use(express.json());

// Routes
app.use("/auth", authRoutes)
app.use("/admin", adminRoutes)
app.use("/user",userRoutes)
app.use("/storeOwner",storeOwnerRoutes)

app.listen(3001, ()=> console.log(" Server is Running On 3001")
)