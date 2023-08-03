const { models } = require("mongoose");
const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists"],
    required: [true, "Email is required"],
  },
  username:{
    type: String,
    unique:[true,"Username already exists"],
    match:[(/^[a-zA-Z0-9]+$/),"Username can only contain letters and numbers"],
  },
  image:{
    type: String,
  }

});

const User =models.User ||  model("User", UserSchema);
export default User;