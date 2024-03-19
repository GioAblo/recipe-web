import dotenv from 'dotenv'
dotenv.config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/users.js";
import { recipesRouter } from "./routes/recipes.js";


const port = process.env.PORT



const app = express();

app.use(express.json());
app.use(cors());


app.use("/auth", userRouter);
app.use("/recipes", recipesRouter)

mongoose.connect(process.env.MONGODB_URL);





app.listen(port, () => console.log("Server runing..."))