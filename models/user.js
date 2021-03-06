const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const usersSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: "Must be a valid email",
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    validate: {
      validator(value) {
        return !value.toLowerCase().includes("password");
      },
      message: "Password must not contain 'password'",
    },
  },
  isLibrarian: {
    type: Boolean,
    default: false,
  },
});

// Generating Auth Token
usersSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      id: this._id,
      isLibrarian: this.isLibrarian,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "4h" }
  );
  return token;
};

// Hashing data before saving into database
usersSchema.pre("save", async function (next) {
  const hashedPassword = await bcrypt.hash(this.password, 10);
  // When password is hashed already, no need to be hashed again
  if (this.isModified("password")) this.password = hashedPassword;
  next();
});

const User = mongoose.model("User", usersSchema);

module.exports = User;
