// Import the express module with the router function
// Require the routes for User and Thought
const router = require("express").Router();
const userRoutes = require("./userRoutes");
const thoughtRoutes = require("./thoughtRoutes");

// This handles the endpoints /api/users and /api/thoughts
router.use("/users", userRoutes);
router.use("/thoughts", thoughtRoutes);

// Export the module
module.exports = router;
