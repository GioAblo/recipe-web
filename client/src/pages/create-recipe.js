import React, { useState } from 'react';
import axios from "axios";
import {useGetUserID} from "../hooks/useGetUserID";
import {useNavigate} from 'react-router-dom';
import {useCookies} from 'react-cookie';

export const CreateRecipe = () => {
  const userID = useGetUserID();
  const [cookies] = useCookies("accses_token");

  const [recipe, setRecipe] = useState({
    name: '',
    instructions: '',
    ingredients: [],
    imageUrl: '',
    cookingTime: 0,
    userOwner: userID
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const {name, value} = event.target;
    setRecipe({...recipe, [name]: value});
  }

  const handleIngredientChange = (event, idx) =>{
    const {value} = event.target;
    const ingredients = recipe.ingredients;
    ingredients[idx] = value
    setRecipe({...recipe, ingredients})
  }
  
  const addIngredient = () => {
    setRecipe({...recipe, ingredients: [...recipe.ingredients, ""]})
  }
  
  const onSubmit = async(event) => {
    event.preventDefault();

    try {
      await axios.post("http://localhost:3001/recipes", recipe,    {headers: {authorization: cookies.accses_token}});
      alert("Recipe created!");
      navigate("/home")
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div style={{maxWidth: '400px'}}>
      <h2>Create Recipe</h2>
      <form onSubmit={onSubmit} style={{display: "flex", flexDirection: "column"}}>
        <label htmlFor='name'>Name</label>
        <input type='tetx' id='name' name='name' onChange={handleChange} />
        {/* <label htmlFor='Description'>Description</label>
        <textarea name='Description' id='Description'></textarea> */}
        <label htmlFor='ingredients'>ingredients</label>
        {recipe.ingredients.map((ingredient, idx) => (
          <input key={idx} type='text' name='ingredients' value={ingredient} 
          onChange={(event) => handleIngredientChange(event, idx)}
           />
        ))}
        <button type='button' onClick={addIngredient}>Add igredient</button>
        <label htmlFor='instructions'>Instructions</label>
        <textarea name='instructions' id='instructions' onChange={handleChange}></textarea>
        <label htmlFor='imageUrl'>image Url</label>
        <input type='text' id='imageUrl' name='imageUrl' onChange={handleChange}/>
        <label htmlFor='cookingTime'>Cooking Time (in minutes)</label>
        <input type='number' id='cookingTime' name='cookingTime' onChange={handleChange}/>
        <button type='submit'>Create</button>
      </form>
    </div>
  )
}
