import User from "../models/User.js";
import bcrypt from "bcryptjs";
import  jwt  from "jsonwebtoken";

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (password.length < 6) {
      return res
        .status(400)
        .send({ error: "Password must be at least 6 characters long" });
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).send({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      role: "client",
      password: hashedPassword,
    });

    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const userWithoutPassword = { ...newUser._doc };
    delete userWithoutPassword.password;

    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({
        message: "User created successfully",
        user: userWithoutPassword,
      });
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(500).send({ error: error.message || "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const {email, password} = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ error: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const userWithoutPassword = { ...user._doc };
    delete userWithoutPassword.password;

    res
      .status(200)
      .cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
      })
      .json({
      message: "Login successful",
      user: userWithoutPassword,
      });
  } catch (error) {
    console.error("Error logging user:", error.message);
    res.status(500).send({ error: error.message || "Internal Server Error" });
  }
};

export const logout = async (req, res) => {
  try {
    res
      .status(200)
      .clearCookie("token", {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      })
      .json({ message: "Logout successful" });
  } catch (error) {
    console.error("Error logging out user:", error.message);
    res.status(500).send({ error: error.message || "Internal Server Error" });
  }
};

export const checkAuth = async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    console.error("Error checking authentication:", error.message);
    res.status(500).send({ error: error.message || "Internal Server Error" });
  }
};


export const updateUserName = async (req, res) => {
  try {
    const { id } = req.params;
    const {name} = req.body;
    if(name.length < 1){
      return res.status(400).send({ error: "Please enter a valid name" });
    }
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user name:", error.message);
    res.status(500).send({ error: error.message || "Internal Server Error" });
  }
};

export const updateUserEmail = async (req, res) => {
  try {
    const { id } = req.params;
    const {email} = req.body;
    if(email.length < 1){
      return res.status(400).send({ error: "Please enter a valid email" });
    }
    if(email === req.user.email){
      const updatedUser = await User.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(updatedUser);
    } else {
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).send({ error: "Email already in use" });
      }
      const updatedUser = await User.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(updatedUser);
    }
  } catch (error) {
    console.error("Error updating user email:", error.message);
    res.status(500).send({ error: error.message || "Internal Server Error" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.countDocuments({
      role: { $ne: "admin" },
    });
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).send({ error: error.message || "Internal Server Error" });
  }
}