import express from "express"
import dotenv from "dotenv"


import connectMongoDB from "./db/connectMongoDB.js";
import authRoutes from "./routes/auth.route.js"

dotenv.config();
const app = express();

const PORT = process.env.PORT || 8000;

console.log(process.env.MONGO_URI);

app.use('/api/auth', authRoutes);


app.listen(PORT, () => {
    connectMongoDB();
    console.log("MongoDB connected");
    console.log(`Server is running on port ${PORT}`);
});