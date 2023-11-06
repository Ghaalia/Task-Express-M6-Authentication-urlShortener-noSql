const { model, Schema } = require("mongoose");

const UserSchema = new Schema({
  username: { type: String, required: true, uniqe: true },
  password: String,
  urls: [
    {
      type: Schema.Types.ObjectId,
      ref: "Url",
    },
  ],
});

module.exports = model("User", UserSchema);
