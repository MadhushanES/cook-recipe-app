import './App.css'
import { BrowserRouter as Router, Route, Routes , Navigate } from 'react-router-dom'
import Login from './Pages/Login'
import Register from './Pages/Register';
import Home from './Pages/Home';
import FavoritePage from './Pages/Favourite';
import Navbar from './Components/Navbar';

const App = () => {
  const isAuthenticated = !!localStorage.getItem('token')
  return (
    <div>
    
    <Router>
      {/* {isAuthenticated && <Navbar/>} */}
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/Register' element={<Register/>}/>
          <Route path='/Home' element={<Home/>}/>
          <Route path='/Favorite' element={<FavoritePage/>}/>
          {/* <Route path='/Home' render={() => (isAuthenticated ? <Home/> : <Navigate to="/" />)} /> */}
          {/* <Route path="/Favorites" render={() => (isAuthenticated ? <FavoritePage/> : <Navigate to="/" />)} /> */}
        </Routes>
      </Router>

    </div>
  );
}

export default App;
