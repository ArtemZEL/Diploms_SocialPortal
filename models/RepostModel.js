const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RepostSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    originalPost: { type: Schema.Types.ObjectId, ref: "Post" },
    caption: { type: String },
    likes: [{ user: { type: Schema.Types.ObjectId, ref: "User" } }],
    comments: [
      {
        _id: { type: String, required: true },
        user: { type: Schema.Types.ObjectId, ref: "User" },
        text: { type: String, required: true },
        date: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Repost", RepostSchema);
