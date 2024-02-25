import {useEffect, useState} from 'react';
import axios from 'axios';
import {useGetUserID} from "../hooks/useGetUserID"

export const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  

  const userID = useGetUserID();

  useEffect(() => {
    const fetchSavedRecipe = async() => {
      try {
        const response = await axios.get(`http://localhost:3001/recipes/savedRecipes/${userID}`);
        setSavedRecipes(response.data.savedRecipes)
        
        
      } catch (error) {
        console.error(error)
      }
    };

    fetchSavedRecipe()
  }, [])

 
  return (
    <div>
      <h1>Saved Recipes</h1>
      
      <ul>
        {savedRecipes.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
             
            </div>
            <img src={recipe.imageUrl} alt={recipe.name}/>
            <div>{recipe.instructions}</div>
            <div>
              <p>{recipe.ingredients}</p>
            </div>
            <p>Cooking time: {recipe.cookingTime} minutes</p>
          </li>
        ))}
      </ul>
          
    </div>
  )
}
 