const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.createUser = async (req, res) => {
  const newUser = new User(req.body);

  try {
    const existingUser = await User.findOne({ email: newUser.email });

    if (existingUser) {
      return res.json({ flag: false, error: "Email already exists" });
    }

    const saltRounds = 10;
    newUser.password = await bcrypt.hash(newUser.password, saltRounds);

    await newUser.save();

    res.json({ flag: true, newUser });
  } catch (error) {
    res.json({ flag: false, error: "Could not create user" });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.params; // Get email and password from URL parameters

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.json({ flag: false, error: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) {
      return res.json({ flag: false, error: "Invalid email or password" });
    }

    res.json({ flag: true, existingUser });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
