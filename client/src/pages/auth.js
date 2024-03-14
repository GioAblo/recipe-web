import  {  useState } from 'react';
import axios from 'axios';
import {useCookies} from 'react-cookie';
import {useNavigate} from "react-router-dom";
import "../App.css"

  

export const Auth = () => {
 
  const [isSign, setIsSign] = useState(false);

  
  return (

    <div className='Auth  flex justify-center flex-col items-center pt-7'>

    <div className=' form-container'>


      {!isSign ? <Login /> :  <Register />}
      
      <div className='signup-link'>

        {!isSign ? "Dont't have an account" : "If you have an account"}
        <div className='signup-link link' onClick={() => setIsSign(!isSign)} >{!isSign ? "sign up now" : "sign in"} </div>
        
      </div>

      
    </div>
    </div>
  );
}


//ავტორიზაცია
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [_, setCookies] = useCookies("accses_token");
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      
      const response = await axios.post("http://localhost:3001/auth/login", {username, password});

      setCookies("accses_token", response.data.token);
      window.localStorage.setItem("userID", response.data.userID);
      console.log("userID", response.data);
      navigate("/home")
    } catch (error) {
      console.error(error)
    }
  }

  return(
    <Form  
    username={username} 
    setUsername={setUsername}
    password={password} 
    setPassword={setPassword} 
    label="Login"
    onSunmit={onSubmit}
    />
  )
}


// რეგისტრაცია
const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async(event) => {
    event.preventDefault();

    try {
      await axios.post("http://localhost:3001/auth/register", {username, password});
      alert("Registration completed! Now you can login!")
    } catch (err) {
      console.error(err);
    }
  }

  return(
    <Form 
      username={username} 
      setUsername={setUsername}
      password={password} 
      setPassword={setPassword} 
      label="Register"
      onSunmit={onSubmit}
    />
  )
}


// ფორმა ავტორიზაცია/რეგისტრაცია
const Form = ({username, setUsername, password, setPassword, label, onSunmit}) => {
 
  return(
    <div>
        <h2 className='logo-container'>{label}</h2>
      <form className='form' onSubmit={onSunmit}>

        <div className='form-group'>
          <label htmlFor='username'>Username:  </label>
          <input value={username} type='text' id="username" onChange={(e) => setUsername(e.target.value)} />
        </div>

        <div className='form-group'>
          <label htmlFor='password'>Password:  </label>
          <input value={password} type='password' id="password" onChange={(e) => setPassword(e.target.value)} />
        </div>

        <button className='form-submit-btn' type='submit'>{label}</button>
      </form>
    </div>
  )
}
