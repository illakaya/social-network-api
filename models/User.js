// Retrieve Schema and model methods from mongoose
const { Schema, model } = require("mongoose");

// Create User Schema
// Username is a required and unique string (trimmed to remove excess spaces)
// Email is a required and unique string (trimmed to remove excess spaces) and a regex is used to validate email addresses
// Thoughts is an array referencing the Thought schema
// Friends is an array referencing the User schema
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trimmed: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, "Must be an email address!"],
    },
    thoughts: [{ type: Schema.Types.ObjectId, ref: "Thought" }],
    friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    toJSON: { virtuals: true },
    id: false,
  }
);

// Create a method called friendCount that will return the length of the friends array of 'this' User
userSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

// Define the userSchema as User
const User = model('User', userSchema);

// Export User schema to be used elsewhere
module.exports = User;