const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 5000;

// Enable CORS for cross-origin requests
app.use(cors());

// Middleware to parse JSON and URL-encoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB using Mongoose
mongoose
  .connect("mongodb://localhost:27017/Registration_Form", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define a User schema using Mongoose
const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  gender: { type: String, required: true },
});

// Create a User model
const User = mongoose.model("User", userSchema);

// GET request - Root endpoint (Optional)
app.get("/", async (req, res) => {
  try {
    const users = await User.find();  // Find all users in the collection
    res.json(users);  // Send the user data as a JSON response
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("An error occurred while fetching the users");
  }
});

// Handle registration POST requests
app.post("/register", async (req, res) => {
  const { fullName, lastName, email, password, phoneNumber, gender } = req.body;

  try {
    // Create a new user instance
    const newUser = new User({
      fullName,
      lastName,
      email,
      password,
      phoneNumber,
      gender,
    });

    // Save the user to the database
    await newUser.save();
    res.status(201).json({
      message: "Registration successful",
      user: newUser,
    });
  } catch (error) {
    // If the error is caused by duplicate emails (unique constraint)
    if (error.code === 11000) {
      res.status(400).json({
        message: "Email already exists. Please use a different email.",
      });
    } else {
      console.error("Error saving user:", error);
      res.status(500).json({ message: "Registration failed", error });
    }
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
