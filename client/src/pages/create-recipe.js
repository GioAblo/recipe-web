import React, { useState } from 'react';
import axios from "axios";
import {useGetUserID} from "../hooks/useGetUserID";
import {useNavigate} from 'react-router-dom';
import {useCookies} from 'react-cookie';
import "../App.css"

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
    <div className='flex flex-col items-center pt-6 lg:text-xl'>

      <h1>Create Recipe</h1>
    <div className='form-container' style={{maxWidth: '400px'}}>

      <form className='form' onSubmit={onSubmit} style={{display: "flex", flexDirection: "column"}}>

        <div className='form-group py-2'>
          <label className='lg:text-base' htmlFor='name'>Name</label>
          <input type='tetx' id='name' name='name' onChange={handleChange} />
        </div>
       
       <div className='form-group py-2'>
        <label htmlFor='ingredients' className='lg:text-base'>Ingredients</label>
        {recipe.ingredients.map((ingredient, idx) => (
          <input className='my-1' key={idx} type='text' name='ingredients' value={ingredient} 
          onChange={(event) => handleIngredientChange(event, idx)}
          />
          ))}
          <button type='button' className='bo border-spacing-3 border-2 rounded w-1/2' onClick={addIngredient}>+ Add</button>
        </div>


        <div className='form-group py-2'>
          <label className='lg:text-base' htmlFor='instructions'>Instructions</label>
          <textarea name='instructions' id='instructions' onChange={handleChange}></textarea>
        </div>

        <div className='form-group py-2'>
          <label className='lg:text-base' htmlFor='imageUrl'>Image Url</label>
          <input type='text' id='imageUrl' name='imageUrl' onChange={handleChange}/>
        </div>

        <div className='form-group py-2'>
          <label className='lg:text-base' htmlFor='cookingTime'>Cooking Time (in minutes)</label>
          <input type='number' id='cookingTime' name='cookingTime' onChange={handleChange}/>
        </div>


        <button type='submit' className='form-submit-btn'>Create</button>
      </form>
    </div>
    </div>
  )
}
