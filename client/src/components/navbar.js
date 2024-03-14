import {Link} from "react-router-dom";
import {useCookies} from 'react-cookie';
import {useNavigate} from "react-router-dom";
import {useGetUserID} from "../hooks/useGetUserID";
import '../App.css'

export const Navbar = () => {
  const [cookies, setCookies] = useCookies("accses_token");
  const navigate = useNavigate();
 const userID = useGetUserID()
  

   

  const logout = () => {
    setCookies("accses_token", "")
    window.localStorage.removeItem("userID");
    navigate("/")
  }
  
  return (
    <div className='navbar lg:px-20 pt-2 pb-2 shadow-md'>  
          <div className="flex justify-around lg:justify-evenly items-center px-2 ">
          {!userID ? <Link to="/">Login/register</Link> : 
          <> 
             <Link to="/home" className="lg:text-xl">Home</Link> 
             <Link to="/create-recipe" className="lg:text-xl">Add recipe</Link>
             <Link to="/saved-recipes" className="lg:text-xl">Saved</Link> 
             <button className="button lg:text-xl text-base" onClick={logout}>Log out</button>
           </>
          }
          </div>       
    </div>
  )
}
