import express  from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {UserModel} from "../models/Users.js" ;

const router = express.Router();


////////   მომხმარებლის რეგისტრაცია!
router.post("/register", async (req, res) => {
    const {username, password} = req.body;

    // ინდენტური username-ის ძიება ბაზაზე
    const user = await UserModel.findOne({username});

    // თუ ეს მომხმარებელი უკვე არსებობს აქ წყდება კოდის კომპილაცია
    if (user) {
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

    const user = await UserModel.findOne({username});

    if(!user) {
        return res.json({message: "User doesn't exist!"})
    }   

    // შედარება ფრონტიდან მოსული პაროლის და მონაცემთა ბაზის პაროლებს შორის
    const isPasswordValid = await bcrypt.compare(password, user.password);


    if(!isPasswordValid) {
        return res.json({message: "Username or password is incorrect!"})
    }
    
    // if web refreshed with this func user not signout!
    const token = jwt.sign({id: user._id}, "secret");
    res.json({token, userID: user._id})

})

export {router as userRouter}

export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if(token) {
        jwt.verify(token, "secret", (err) => {
            if(err) return res.sendStatus(403);
            next();
        });
    }else (
        res.sendStatus(401)
    )
}