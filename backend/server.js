import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"


import connectMongoDB from "./db/connectMongoDB.js";
import authRoutes from "./routes/auth.route.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cookieParser())
app.use(express.json()); // to parse req.body
app.use(express.urlencoded({ extended: true }));// to parse urlencoded data

app.use('/api/auth', authRoutes);


app.listen(PORT, () => {
    connectMongoDB();
    console.log("MongoDB connected");
    console.log(`Server is running on port ${PORT}`);
});