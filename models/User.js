const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    maxlength: 30,
    minlength: 3,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    minlength: 10,
  },
  password: {
    type: String,
    required: true,
    minlength: 10,
  },
  profileImgUrl: {
    type: String,
    minlength: 5,
  },
  coverImgUrl: {
    type: String,
    minlength: 5,
  },
  organizer: {
    type: Boolean,
    default: false,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("User", userSchema);
