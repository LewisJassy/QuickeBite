const mongoose = require('mongoose');
const Restaurant = require('./models/restaurant');

const seedRestaurants = async () => {
  await mongoose.connect('mongodb://localhost:27017/quickebite', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const restaurants = [
    {
        "name": "Pizza Palace",
        "address": "123 Main St, Anytown, Kenya",
        "rating": 4.5,
        "cuisine": "Italian",
    },
    {
        "name": "Burger Barn",
        "address": "456 Elm, OTC, Kenya",
        "rating": 4.2,
        "cuisine": "American",
    },
    {
        "name": "Sushi Spot",
        "address": "789 Pine, Nairobi, Kenya",
        "rating": 4.7,
        "cuisine": "Japanese",
    },
    {
        "name": "Pasta Paradise",
        "address": "101 Oak, Nairobi, Kenya",
        "rating": 4.3,
        "cuisine": "Italian",
    },
    {
        "name": "Taco Town",
        "address": "222 Maple, Nairobi, Kenya",
        "rating": 4.6,
        "cuisine": "Mexican",
    },
    {
        "name": "Thai Taste",
        "address": "333 Birch, Nairobi, Kenya",
        "rating": 4.4,
        "cuisine": "Thai",
    },
  ];

  await Restaurant.insertMany(restaurants);
  console.log('Database seeded with sample restaurants.');
  mongoose.connection.close();
};

seedRestaurants().catch(err => {
  console.error(err);
  mongoose.connection.close();
});
