/**
 * Controllers
 *
 * Controllers handle the logic for each route. They receive the
 * request (req) and response (res) objects from Express and decide
 * what data to send back to the client.
 *
 * Separating controllers from routes keeps our code organized —
 * routes define the URL paths, controllers define the behavior.
 */

// Sample restaurant data (will be replaced with a database later)
const restaurants = [
  {
    id: 1,
    name: 'Green Garden Bistro',
    cuisine: 'Mediterranean',
    rating: 4.5,
    healthyOptions: true
  },
  {
    id: 2,
    name: 'Fresh Fuel Kitchen',
    cuisine: 'American',
    rating: 4.7,
    healthyOptions: true
  },
  {
    id: 3,
    name: 'Sakura Bowl',
    cuisine: 'Japanese',
    rating: 4.3,
    healthyOptions: true
  }
];

// GET /api/restaurants - Return all restaurants
const getRestaurants = (req, res) => {
  res.json(restaurants);
};

module.exports = { getRestaurants };
