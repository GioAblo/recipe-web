import dotenv from 'dotenv'
dotenv.config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/Users.js";
import { recipesRouter } from "./routes/recipes.js";


const port = process.env.PORT



const app = express();

app.use(express.json());
app.use(cors());


app.use("/auth", userRouter);
app.use("/recipes", recipesRouter)

mongoose.connect(process.env.MONGODB_URL);


app.use("/run", (req, res) => {
    res.send("server is runing...")
})




app.listen(port, () => console.log("Server runing..."))