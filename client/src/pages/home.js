import {useEffect, useState} from 'react';
import axios from 'axios';
import {useGetUserID} from "../hooks/useGetUserID";
import {useCookies} from 'react-cookie';


export const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState();

  const [cookies] = useCookies("accses_token");

  
    
   

  
  const userID = useGetUserID();

  let isRecipeSaved
  
  
  useEffect(() => {

    const fetchRecipe = async() => {
      try {
        const response = await axios.get("http://localhost:3001/recipes");
        setRecipes(response.data);
        
        
        
      } catch (error) {
        console.error(error)
      }
    };

    const fetchSavedRecipe = async() => {
      try {
        const response = await axios.get(`http://localhost:3001/recipes/savedRecipes/ids/${userID}`);
        setSavedRecipes(response.data.savedRecipes)
        
        
      } catch (error) {
        console.error(error)
      }
    };


    fetchRecipe()
    if(cookies.accses_token) fetchSavedRecipe();
  }, []);

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put("http://localhost:3001/recipes", {recipeID, userID},
      {headers: {authorization: cookies.accses_token}}
      );
      setSavedRecipes(response.data.savedRecipes);



      
    } catch (error) {
      console.error(error)
    }
  }
  
  
  if(cookies) {
      isRecipeSaved = (id) => savedRecipes.includes(id)
  }else return
  

  return (
    <div>
      <h1>Recipes</h1>
      
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
              <button onClick={() => saveRecipe(recipe._id)}  disabled={isRecipeSaved(recipe._id)}>{isRecipeSaved(recipe._id) ? "Saved" : "Save"}</button>
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