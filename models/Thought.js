// Retrieve Schema and model methods from mongoose
// Retrieve dayjs to format dates
const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const dayjs = require("dayjs");

// Create Reaction Schema
// reactionID Uses Mongoose's ObjectID data type and the default value is set to a new ObjectId
// reactionBody is a required string with a max length of 280 characters
// username is a required string
// createdAt is a date that defaults to the current timestamp and uses dayjs to get the preferred date formatting
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dayjs(timestamp).format('YYYY/MM/DD [at] hh:mm a'),
    },
  },
  {
    toJSON: { getter: true },
    id: false,
    _id: false
  }
);

// Create Thought Schema
// thoughtText is a required string ranging from 1 to 280 characters
// createdAt is a date that defaults to the current timestamp and uses dayjs to get the preferred date formatting
// username is a required string
// reactions is an array holding the reaction subdocument/reactionSchema
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dayjs(timestamp).format('YYYY/MM/DD [at] hh:mm a'),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// Create a method called reactionCount that will return the length of the reactions array of 'this' thought
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

// Define the userSchema as User
const Thought = model("Thought", thoughtSchema);

// Export User schema to be used elsewhere
module.exports = Thought;
