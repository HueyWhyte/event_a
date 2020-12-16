const { Schema, model } = require("mongoose");

const feedSchema = new Schema({
  body: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  event: {
    type: Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  media: [{ mediaUrl: String }],
  comments: [
    {
      body: String,
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  timestamp: {
    type: Date,
    default: Date.now,
  },
  edited: {
    type: Boolean,
    default: false,
  },
});

module.exports = model("Feed", feedSchema);
