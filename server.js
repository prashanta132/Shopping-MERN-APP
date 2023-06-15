import express from 'express';

import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './config/routes/authRoute.js';
import categoryRoutes from './config/routes/categoryRoutes.js';
import productRoutes from './config/routes/productRoutes.js';
import cors from "cors";
import path from 'path';



///configure env
dotenv.config();

/////database config
connectDB();


//rest object 
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, './client/build')));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

//rest api
app.use("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
});


///Port

const PORT = process.env.PORT || 8080;

///RUNN LISTEN
app.listen(PORT, () => {
    console.log(`Server Running  on ${process.env.DEV_MODE} mode on port ${PORT}`.bgBlack.white);


});

