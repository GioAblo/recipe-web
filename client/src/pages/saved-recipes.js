import {useEffect, useState} from 'react';
import axios from 'axios';
import {useGetUserID} from "../hooks/useGetUserID"
import arrow from '../assets/img/arrow.png'
import "./home.css"

export const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  

  const userID = useGetUserID();

  useEffect(() => {
    const fetchSavedRecipe = async() => {
      try {
        const response = await axios.get(`https://recipe-web-toey.onrender.com/recipes/savedRecipes/${userID}`);
        setSavedRecipes(response.data.savedRecipes)
        
        
      } catch (error) {
        console.error(error)
      }
    };

    fetchSavedRecipe()
  }, [])



  /// ქლიკის დროს გადიდდება ტექსტი და შემცირდება - descriptions
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


  // ქლიკის დროს გადიდდება ტექსტი და შემცირდება - igredients

  const [expandedIgredients, setExpandedIgredients] = useState({});

  const toggleSeeIng = (recipeID) => {
    setExpandedIgredients(prevState => ({
      ...prevState,
      [recipeID]: !prevState[recipeID]
    }));
  };

  const isIgredientsExpanded = (recipeID) => {
    return expandedIgredients[recipeID];
  };

 
  return (
    <div className='home lg:px-20 flex items-center flex-col pt-4 xl:pl-32'>
    <h1 className='pb-1 text-xl lg:text-xl'>Saved Recipes</h1>

    <div className='recipe-card sm:px-10'>
      <ul className='md:flex md:gap-2 md:flex-wrap' >
        {savedRecipes.map((recipe) => (
          <li className='mb-4 shadow-md p-3 md:w-96 ' key={recipe._id}>

            <div className=" min-w-64 min-h-60 h-56  relative">
              <img className='rounded object-cover w-full h-full' src={recipe.imageUrl} alt={recipe.name} />
              <div className='absolute bottom-0 rounded-tr-3xl bg-white px-10 py-2'>
                <h2 className='font-bold '>{recipe.name}</h2>
              </div>
            </div>

            <div className='p-2  pt-4'>
              <div >
              <div style={{ height: isIgredientsExpanded(recipe._id) ? "auto" : "94px" }}   className='pt-2 overflow-hidden'>
                <b>Igredients: </b>
                <div >
                  {recipe.ingredients.map((ingredient, index) => (
                      <div  key={index} className='py-1  pl-2 text-sm '>
                        <span className='text-xs pr-1 opacity-60'>&#9899;</span> {ingredient} 
                      </div>
                      ))}
                   
                  </div> 
                
              </div>
              <button className='flex flex-col items-center w-full border rounded py-1 border-slate-500	' style={{transform: isIgredientsExpanded(recipe._id) ? "rotate(180deg)" : "rotate(0deg)"}} onClick={() => toggleSeeIng(recipe._id)}> <img src={arrow} alt='arrow'  /></button>
              </div>
              <p className='pt-2'><b>Cook time:  </b> {recipe.cookingTime} minutes</p>
              <div className='pt-2 pb-5 relative'>
                <b> Instructions: </b>
                <p style={{ height: isRecipeExpanded(recipe._id) ? "auto" : "70px" }} className=' overflow-hidden pl-3 text-zinc-400'>
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
 