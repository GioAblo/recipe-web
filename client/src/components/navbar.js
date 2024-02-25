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
    <div className='navbar pt-2 pb-2 shadow-md'>  
          <div className="flex justify-around items-center px-2 ">
          {!userID ? <Link to="/">Login/register</Link> : 
          <> 
             <Link to="/home">Home</Link> 
             <Link to="/create-recipe">Add recipe</Link>
             <Link to="/saved-recipes">Saved</Link> 
             <button className="button" onClick={logout}>Log out</button>
           </>
          }
          </div>       
    </div>
  )
}
