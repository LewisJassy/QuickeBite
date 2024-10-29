const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const restaurantRoute = require('./routes/restaurantRoute');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const uri = 'mongodb://localhost:27017/quickebite'

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

app.use('/api/restaurants', restaurantRoute);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
console.log("\nRestaurant Services is running")