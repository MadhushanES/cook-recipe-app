// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Navbar from '../Components/Navbar';

// const FavoritePage = () => {
//   const [favorites, setFavorites] = useState([]);

//   useEffect(() => {
//     const fetchFavorites = async () => {
//       try {
//         const token = localStorage.getItem('token')
//         const headers = {authorization: token}
//         const response = await axios.get('http://localhost:5000/post/favorites', {headers}); // Use the correct endpoint URL
//         console.log(response)
//         setFavorites(response.data.favoriteMeals); // Assuming the response data structure is { favoriteMeals: [...] }
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchFavorites();
//   }, []);

//   return (
//     <div>
//       <Navbar/>
//     <div className='container1'>
//     <div className='meal1'>
//       <div className='meal-tiles1'>
//         {favorites.map((meal) => (
//           <div className='meal-tile1' key={meal.mealId}>
//             <img className='img1' src={meal.thumbnail} alt={meal.mealName} />
//             <h3>{meal.mealName}</h3>
//           </div>
//         ))}
//       </div>
//     </div>
//     </div>
//     </div>
//   );
// };

// export default FavoritePage;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Navbar from '../Components/Navbar';
// import './Favourite.css'; // Import the CSS file for styling

// const FavoritePage = () => {
//   const [favorites, setFavorites] = useState([]);

//   useEffect(() => {
//     const fetchFavorites = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const headers = { authorization: token };
//         const response = await axios.get('http://localhost:5000/post/favorites', { headers });
//         console.log(response);
//         setFavorites(response.data.favoriteMeals);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchFavorites();
//   }, []);

//   return (
//     <div>
//       <Navbar />
//       <div className='containerfav'>
//         <div className='meal'>
//           <div className='meal-tiles'>
//             {favorites.map((meal) => (
//               <div className='meal-tile' key={meal.mealId}>
//                 <img className='img' src={meal.thumbnail} alt={meal.mealName} />
//                 <h3>{meal.mealName}</h3>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FavoritePage;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Navbar from '../Components/Navbar';
// import './Favourite.css'; // Import the CSS file for styling

// const FavoritePage = () => {
//   const [favorites, setFavorites] = useState([]);
//   const [recipe, setRecipe] = useState(null);
//   const [selectedMeal, setSelectedMeal] = useState(null)

//   useEffect(() => {
//     const fetchFavorites = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const headers = { authorization: token };
//         const response = await axios.get('http://localhost:5000/post/favorites', { headers });
//         console.log(response);
//         setFavorites(response.data.favoriteMeals);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchFavorites();
//   }, []);

//   const handleMealClick = async (mealId) => {
//     setSelectedMeal(mealId);
//     const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
//     const data = await response.json();
//     setRecipe(data.meals[0]);
// };

//   const removeFromFavorites = async (mealId) => {
//     try {
//       const token = localStorage.getItem('token');
//       const headers = { authorization: token };
//       await axios.delete(`http://localhost:5000/post/favor/${mealId}`, { headers });
//       setFavorites(favorites.filter(meal => meal.mealId !== mealId));
//       console.log(mealId)
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       <Navbar />
//       <div className='containerfav'>
//         <div className='meal'>
//           <div className='meal-tiles'>
//             {favorites.map((meal) => (
//               <div className='meal-tile' key={meal.mealId} onClick={() => handleMealClick(meal.idMeal)}>
//                 <img className='img' src={meal.thumbnail} alt={meal.mealName} />
//                 <button className='btnn' onClick={() => removeFromFavorites(meal.mealId)}>❤️</button>
//                 <h3>{meal.mealName}</h3>
//               </div>
//             ))}
//           </div>
//         </div>
//         {recipe && (
//                     <div className="recipe">
//                         <h2>{recipe.strMeal}</h2>
//                         <img src={recipe.strMealThumb} alt={recipe.strMeal} />
//                         <h3>Ingredients</h3>
//                         <ul>
//                             {Object.entries(recipe).map(([key, value]) => {
//                                 if (key.includes("Ingredient") && value) {
//                                     return <li key={key}>{value}</li>;
//                                 }
//                                 return null;
//                             })}
//                         </ul>
//                         <h3>Instructions</h3>
//                         <p>{recipe.strInstructions}</p>
//                     </div>
//                 )}
//       </div>
//     </div>
//   );
// };

// export default FavoritePage;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import './Favourite.css'; // Import the CSS file for styling

const FavoritePage = () => {
  const [favorites, setFavorites] = useState([]);
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = { authorization: token };
        const response = await axios.get('http://localhost:5000/post/favorites', { headers });
        setFavorites(response.data.favoriteMeals);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFavorites();
  }, []);

  const handleMealClick = async (mealId) => {
    try {
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
      setRecipe(response.data.meals[0]);
    } catch (error) {
      console.error('Error fetching meal details:', error);
    }
  };

  const removeFromFavorites = async (mealId) => {
    try {
      const token = localStorage.getItem('token');
      const headers = { authorization: token };
      await axios.delete(`http://localhost:5000/post/favor/${mealId}`, { headers });
      setFavorites(favorites.filter(meal => meal.mealId !== mealId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className='containerfav'>
        <div className='meal'>
          <div className='meal-tiles'>
            {favorites.map((meal) => (
              <div className='meal-tile' key={meal.mealId} onClick={() => handleMealClick(meal.idMeal)}>
                <img className='img' src={meal.thumbnail} alt={meal.mealName} />
                <button className='btnn' onClick={() => removeFromFavorites(meal.mealId)}>❤️</button>
                <h3>{meal.mealName}</h3>
              </div>
            ))}
          </div>
        </div>
        {recipe && (
          <div className="recipe">
            <h2>{recipe.strMeal}</h2>
            <img src={recipe.strMealThumb} alt={recipe.strMeal} />
            <h3>Ingredients</h3>
            <ul>
              {Object.entries(recipe).map(([key, value]) => {
                if (key.includes("Ingredient") && value) {
                  return <li key={key}>{value}</li>;
                }
                return null;
              })}
            </ul>
            <h3>Instructions</h3>
            <p>{recipe.strInstructions}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritePage;




