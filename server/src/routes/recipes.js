import express from 'express';
import mongoose from 'mongoose';
import {RecipeModel} from "../models/Recipes.js";
import {UserModel} from "../models/Users.js";
import { verifyToken } from './users.js';

const router = express.Router();


// API ფრონტისთვის რომ გამოსახოს მონაცემები ფრონტზე!
router.get("/",  async (req, res) =>{
    try {
        const response = await RecipeModel.find({});
        res.json(response)
    } catch (error) {
        console.error(error)
    }
});


// რეცეპტების დამატება მონაცემთა ბაზაზე ფრონტენდიდან მიღებული ინფორმაციით, მომხმარებლის მიერ!
router.post("/", verifyToken, async (req, res) =>{
    const recipe = new RecipeModel(req.body)
    try {
        const response = await recipe.save();
        res.json(response)
    } catch (error) {
        console.error(error)
    }
});


///  დამახსოვრებული რეცეპტების შეტანა users კოლექციაზე, ბაზაზე !     
router.put("/", verifyToken, async (req, res) =>{
    try {
        const recipe = await RecipeModel.findById(req.body.recipeID);
        const user = await UserModel.findById(req.body.userID);
        user.savedRecipes.push(recipe);
        await user.save()
        res.json({savedRecipes: user.savedRecipes})
    } catch (error) {
        console.error(error)
    }
});


// ID, მიიღება მხოლოდ ავტორიზებული მომხმარებლის დამახსოვრებული რეცეპტები, ფრონტზე! 
router.get("/savedRecipes/ids/:userID", async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userID);
        res.json({savedRecipes: user?.savedRecipes})       
    } catch (error) {
        res.json(error)
        console.error(error)
    }
} );

// API ფრონტისთვის, 
router.get("/savedRecipes/:userID", async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userID);
        const savedRecipes = await RecipeModel.find({_id: {$in: user.savedRecipes},})
        res.json({savedRecipes})       
    } catch (error) {
        res.json(error)
        console.error(error)
    }
} )

export {router as recipesRouter}