import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getRestaurants } from '../../services/restaurantService';
import Hero from '../Hero.js'; // Import the Hero component
import './RestaurantList.css'; // Import any specific styles for RestaurantList

function RestaurantList() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    async function fetchRestaurants() {
      try {
        const data = await getRestaurants();
        setRestaurants(data);
      } catch (error) {
        console.error('Failed to fetch restaurants:', error);
      }
    }
    fetchRestaurants();
  }, []);

  return (
    <div>
      <Hero title="Restaurants" /> {/* Use Hero for title and background */}
      <div className="restaurant-list"> {/* Add a wrapper for styling */}
        <h1 className="list-title">Available Restaurants</h1> {/* Optional title for the list */}
        <ul>
          {restaurants.length > 0 ? (
            restaurants.map((restaurant) => (
              <li key={restaurant.id} className="restaurant-item">
                <Link to={`/order?restaurantId=${restaurant.id}`} className="restaurant-link">
                  {restaurant.name}
                </Link>
              </li>
            ))
          ) : (
            <li>No restaurants found.</li> // Message if no restaurants are available
          )}
        </ul>
      </div>
    </div>
  );
}

export default RestaurantList;