import express  from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import {UserModel} from "../models/model-users.js" ;
import dotenv from 'dotenv'
dotenv.config();

const jwtsecrettoken = process.env.JWT_SECRET

const router = express.Router();


////////   მომხმარებლის რეგისტრაცია!
router.post("/register", async (req, res) => {
    const {username, password} = req.body;

    // ინდენტური username-ის ძიება ბაზაზე
    const users = await UserModel.findOne({username});

    // თუ ეს მომხმარებელი უკვე არსებობს აქ წყდება კოდის კომპილაცია
    if (users) {
        return res.json({message: "User already exists!"})
    };

    // hashed password პაროლის დაცვა გაძლიერება მათემატიკური გამოთვლებში გადაყვანა bcrypt ით.
    const hashedPassword = await bcrypt.hash(password, 10);

    // ახალი user ის შექმნა!
    const newUser = new UserModel({username, password: hashedPassword});
    // user ის შენახვა!
    await newUser.save();


    // მესიჯი რომ ახალი მომხმარებელი დარეგისტრირდა
    res.json({message: "New User registerd!!"})
});


////////   მომხმარებლის ავტორიზაცია!
router.post("/login", async (req, res) => {
    const {username, password} = req.body;

    const users = await UserModel.findOne({username});

    if(!users) {
        return res.json({message: "User doesn't exist!"})
    }   

    // შედარება ფრონტიდან მოსული პაროლის და მონაცემთა ბაზის პაროლებს შორის
    const isPasswordValid = await bcrypt.compare(password, users.password);


    if(!isPasswordValid) {
        return res.json({message: "Username or password is incorrect!"})
    }
    
    // if web refreshed with this func user not signout!
    const token = jwt.sign({id: users._id}, jwtsecrettoken);
    res.json({token, userID: users._id})

})

export {router as userRouter}

export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if(token) {
        jwt.verify(token, jwtsecrettoken, (err) => {
            if(err) return res.sendStatus(403);
            next();
        });
    }else (
        res.sendStatus(401)
    )
}