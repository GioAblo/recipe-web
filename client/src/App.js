import './index.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {Home} from "./pages/home.js";
import {Auth} from "./pages/auth";
import {CreateRecipe} from "./pages/create-recipe";
import {SavedRecipes} from "./pages/saved-recipes";
import {Navbar} from "./components/navbar.js";


function App() {

  


  return (
    <div className="flex bg-slate-700" >
      <Router>

        
        <Navbar />



        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/home" element={<Home />} />
          <Route path="/create-recipe" element={<CreateRecipe />} />
          <Route path="/saved-recipes" element={<SavedRecipes />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
