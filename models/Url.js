const { model, Schema } = require("mongoose");

const URLSchema = new Schema({
  urlCode: String,
  longUrl: String,
  shortUrl: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = model("Url", URLSchema);
