import {Link} from "react-router-dom";
import {useCookies} from 'react-cookie';
import {useNavigate} from "react-router-dom";
import {useGetUserID} from "../hooks/useGetUserID";

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
    <div className='navbar'>  
          <div>
          {!userID ? <Link to="/">Login/register</Link> : <> <Link to="/create-recipe">Create recipes</Link><Link to="/home">Home</Link> <Link to="/saved-recipes">Saved recipes</Link> <button onClick={logout}>Log out</button></> }
          </div>       
    </div>
  )
}
