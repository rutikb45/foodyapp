const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const jwtSecret = process.env.JWT_SECRET || "defaultSecret"; // Using environment variable for JWT secret

router.post(
  "/createuser",
  [
    body("email").isEmail(),
    body("name").isLength({ min: 5 }),
    body("password").isLength({ min: 5 }).withMessage("Password must be at least 5 characters long."),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); // 400 Bad Request for validation errors
    }

    const salt = await bcrypt.genSalt(10);
    const secpassword = await bcrypt.hash(req.body.password, salt);

    try {
      await User.create({
        name: req.body.name,
        password: secpassword,
        email: req.body.email,
        location: req.body.location,
      });

      res.status(201).json({ success: true, message: "User created successfully" }); // 201 Created for successful resource creation
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Failed to create user" }); // 500 Internal Server Error for unexpected errors
    }
  }
);

router.post("/loginuser", async (req, res) => {
  let email = req.body.email;
  try {
    let userData = await User.findOne({ email });
    if (!userData) {
      return res.status(400).json({ errors: "Try login with correct credentials" });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordMatch = await bcrypt.compare(req.body.password, userData.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ errors: "Try login with correct credentials" });
    }

    return res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
});

module.exports = router;
 