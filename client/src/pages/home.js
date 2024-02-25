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
    <div className='home flex items-center flex-col'>
      <h1>Recipes</h1>

      <div className=''>
        <ul >
          {recipes.map((recipe) => (
            <li className='mb-4 shadow-md ' key={recipe._id}>
              <div className="relative">
                <img className='rounded max-h-60 ' src={recipe.imageUrl} alt={recipe.name}/>
                <div className='absolute bottom-0 rounded-tr-3xl bg-white px-10 py-2'>
                  <h2 className='font-bold '>{recipe.name}</h2>
                </div>
              </div>
                <button onClick={() => saveRecipe(recipe._id)}  disabled={isRecipeSaved(recipe._id)}>{isRecipeSaved(recipe._id) ? "Saved" : "Save"}</button>
              <div>{recipe.instructions}</div>
              <div>
                <p>Igredients:{recipe.ingredients}</p>
              </div>
              <p>Cooking time: {recipe.cookingTime} minutes</p>
            </li>
          ))}
        </ul>
      </div>
          
    </div>
  )
}