import React, { useState, useEffect } from 'react'
import './Home.css'
import axios from 'axios'
import Navbar from '../Components/Navbar'

function CategorizedMeals() {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [meals, setMeals] = useState([]);
    const [selectedMeal, setSelectedMeal] = useState(null);
    const [recipe, setRecipe] = useState(null);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        async function fetchCategories() {
            const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
            const data = await response.json();
            const filteredCategories = data.categories.filter(category => category.strCategory === 'Pork' || category.strCategory === 'Beef' ||category.strCategory === 'Chicken' || category.strCategory === 'Lamb' || category.strCategory === 'Pasta')
            setCategories(filteredCategories);
        }

        fetchCategories();
    }, []);

    useEffect(() => {
        async function fetchMeals() {
            if (selectedCategory !== '') {
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`);
                const data = await response.json();
                setMeals(data.meals);
            }
        }

        fetchMeals();
    }, [selectedCategory]);

    const handleCategoryClick = async (category) => {
        setSelectedCategory(category);
        setSelectedMeal(null);
        setRecipe(null);
    };

    const handleMealClick = async (mealId) => {
        setSelectedMeal(mealId);
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
        const data = await response.json();
        setRecipe(data.meals[0]);
    };

    // const handleAddToFavorites = (meal) => {
    //     const index = favorites.findIndex(favMeal => favMeal.idMeal === meal.idMeal);
    //     if (index === -1) {
    //         setFavorites([...favorites, meal]);
    //     } else {
    //         axios.post('http://localhost:5000/post/addToFavorites', meal)
    //         const updatedFavorites = [...favorites];
    //         updatedFavorites.splice(index, 1);
    //         setFavorites(updatedFavorites);
    //     }
    //     console.log(meal)
        
    // };


    const [message, setMessage] = useState('');

       
    const handleFavorite = async (meal) => {
        const mealId = meal.idMeal
        const mealName = meal.strMeal
        const thumbnail = meal.strMealThumb
        try {
            const token = localStorage.getItem('token');
            console.log(token);
            const response = await axios.post('http://localhost:5000/post/favor', { mealId, mealName, thumbnail }, {
                headers: {
                    'authorization': token
                }
            });
            setMessage(response.data.message);
        } catch (error) {
            if (error.response && error.response.data) {
                setMessage(error.response.data.error);
            } else {
                setMessage("An error occurred while processing your request.");
            }
        }
        console.log(meal.idMeal)
    }
    

    const isFavorite = (mealId) => {
        return favorites.some(favMeal => favMeal.idMeal === mealId);
    };

    return (
        <div>
        <Navbar/>
        
        <div className="container1">            
            <div className="categories">
                <div className="category-tiles">
                    {categories.map(category => (
                        <div
                            key={category.strCategory}
                            className="category-tile"
                            onClick={() => handleCategoryClick(category.strCategory)}
                        >
                            {category.strCategory}
                        </div>
                    ))}
                </div>
            </div>
            <div className="meals">
                <div className="meal-tiles">
                    {meals.map(meal => (
                        <div key={meal.idMeal} className="meal-tile" onClick={() => handleMealClick(meal.idMeal)}>
                            <img src={meal.strMealThumb} alt={meal.strMeal} />
                            
                            <button className='btn'
                                onClick={() => handleFavorite(meal)}
                                style={{ color: isFavorite(meal.idMeal) ? 'pink' : 'black' }}
                            >
                                {isFavorite(meal.idMeal) ? '❤️' : '🤍'}
                            </button>
                            <p>{meal.strMeal}</p>
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
}

export default CategorizedMeals;
