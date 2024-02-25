import  {  useState } from 'react';
import axios from 'axios';
import {useCookies} from 'react-cookie';
import {useNavigate} from "react-router-dom";


  

export const Auth = () => {
 
  const [isSign, setIsSign] = useState(false);

  
  return (
    <div>
      {!isSign ? <Login /> :  <Register />}
      
      <div style={{paddingTop: "20px"}}>
        
        <button onClick={() => setIsSign(!isSign)}  style={{cursor: "pointer", color: "blue"}}>{!isSign ? "sign up" : "sign in"} </button>
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
      <form onSubmit={onSunmit}>
        <h2>{label}</h2>
        <div>
          <label htmlFor='username'>Username:  </label>
          <input value={username} type='text' id="username" onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label htmlFor='password'>Password:  </label>
          <input value={password} type='password' id="password" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type='submit'>{label}</button>
      </form>
    </div>
  )
}
