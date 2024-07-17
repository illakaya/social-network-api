// Import the express module with the router function
// Retrieve the modules for the api routes
const router = require('express').Router();
const apiRoutes = require('./api');

// This is for routes concerning /api endpoints
router.use('/api', apiRoutes);

// Error handling for routes that do not have /api endpoint
router.use((req, res) => {
  return res.send('Wrong route!');
});

// Export the router module
module.exports = router;