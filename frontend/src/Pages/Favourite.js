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

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import './Favourite.css'; // Import the CSS file for styling

const FavoritePage = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = { authorization: token };
        const response = await axios.get('http://localhost:5000/post/favorites', { headers });
        console.log(response);
        setFavorites(response.data.favoriteMeals);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <div>
      <Navbar />
      <div className='containerfav'>
        <div className='meal'>
          <div className='meal-tiles'>
            {favorites.map((meal) => (
              <div className='meal-tile' key={meal.mealId}>
                <img className='img' src={meal.thumbnail} alt={meal.mealName} />
                <h3>{meal.mealName}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoritePage;

