var mongoose = require("mongoose");

var campgroundsSchema = new mongoose.Schema({
  image: String,
  price: String,
  name: String,
  date: {type: Date, default: Date.now},
  description: String,
  author:{
    id:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  },
  comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
      }
    ]
});
module.exports = mongoose.model("Campgrounds", campgroundsSchema);
