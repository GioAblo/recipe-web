import { useEffect, useState } from 'react';
import axios from 'axios';
import { useGetUserID } from "../hooks/useGetUserID";
import { useCookies } from 'react-cookie';

export const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [cookies] = useCookies("access_token");

  const userID = useGetUserID();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get("http://localhost:3001/recipes");
        setRecipes(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchSavedRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/recipes/savedRecipes/ids/${userID}`);
        setSavedRecipes(response.data.savedRecipes);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecipe();
    if (cookies.access_token) fetchSavedRecipe();
  }, [userID, cookies.access_token]);

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put("http://localhost:3001/recipes", { recipeID, userID },
        { headers: { authorization: cookies.access_token } }
      );
      setSavedRecipes(response.data.savedRecipes);
    } catch (error) {
      console.error(error);
    }
  };


 /// ქლიკის დროს გადიდდება ტექსტი და შემცირდება
  const [expandedRecipes, setExpandedRecipes] = useState({});

  const toggleSeeMore = (recipeID) => {
    setExpandedRecipes(prevState => ({
      ...prevState,
      [recipeID]: !prevState[recipeID]
    }));
  };

  const isRecipeExpanded = (recipeID) => {
    return expandedRecipes[recipeID];
  };

  return (
    <div className='home flex items-center flex-col pt-4'>
      <h1 className='pb-1 text-xl'>Recipes</h1>

      <div className=''>
        <ul >
          {recipes.map((recipe) => (
            <li className='mb-4 shadow-md p-3' key={recipe._id}>

              <div className=" min-w-64 min-h-60 h-56  relative">
                <img className='rounded object-cover w-full h-full' src={recipe.imageUrl} alt={recipe.name} />
                <div className='absolute bottom-0 rounded-tr-3xl bg-white px-10 py-2'>
                  <h2 className='font-bold '>{recipe.name}</h2>
                </div>
              </div>

              <div className='p-2  pt-4'>
                <button onClick={() => saveRecipe(recipe._id)} disabled={savedRecipes.includes(recipe._id)}>{savedRecipes.includes(recipe._id) ? "Saved" : "Save"}</button>
                <div className='pt-2'>
                  <b>Igredients: </b>

                  {recipe.ingredients.map((ingredient, index) => (
                    <div key={index} className='py-1 pl-2 text-sm '>
                      
                      <span className='text-xs pr-1 opacity-60'>&#9899;</span> {ingredient}
                      
                    </div>
                  ))}
                </div>
                <p className='pt-2'><b>Cook time:  </b> {recipe.cookingTime} minutes</p>
                <div className='pt-2 pb-5 relative'>
                  <b> Instructions: </b>
                  <p style={{ height: isRecipeExpanded(recipe._id) ? "auto" : "60px" }} className=' overflow-hidden pl-3 text-zinc-400'>
                    {recipe.instructions}
                  </p>
                  <span onClick={() => toggleSeeMore(recipe._id)} className='absolute bottom-0 cursor-pointer right-0 text-zinc-900'>{isRecipeExpanded(recipe._id) ? "See less" : "See more"}</span>
                </div>
              </div>

            </li>
          ))}
        </ul>
      </div>

    </div>
  )
}
