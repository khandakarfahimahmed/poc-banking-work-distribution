require("dotenv").config();
const models = require("../models/user.query");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateToken = (userId, userName, userEmail) => {
  return jwt.sign({ userId, userName, userEmail }, process.env.SECRET_KEY, {
    expiresIn: "1h",
  });
};

exports.signUp = async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, password, role } = req.body;
    const userExists = await models.findOneUser({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await models.postOne({
      name,
      email,
      password: hashedPassword,
      role,
    });

    const token = generateToken(newUser.id, newUser.name, newUser.email);
    res.status(201).json({ newUser, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await models.findOneUser({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = generateToken(user.id, user.name, user.email);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getAllUser = async (req, res) => {
  try {
    const user = await models.findAlluser();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  } else {
    const bearer = token.split(" ");
    const tokenValue = bearer[1];
    req.token = tokenValue;
    next();
  }
};

// exports.verifyToken = (req, res, next) => {
//   const bearerHeader = req.headers["authorization"];
//   if (!bearerHeader || typeof bearerHeader !== "string") {
//     return res.status(401).json({ message: "Unauthorized" });
//   } else {
//     const bearer = bearerHeader.split(" ");
//     if (bearer.length !== 2 || bearer[0] !== "Bearer") {
//       return res.status(401).json({ message: "Invalid token format" });
//     }
//     const token = bearer[1];
//     req.token = token;
//     next();
//   }
// };
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await models.findAllTasks();
    if (!tasks) {
      return res.status(404).json({ message: "Tasks not found" });
    }
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addTask = async (req, res) => {
  try {
    const { task_name } = req.body;
    const task = await models.postTask({ task_name, status: "not done" });
    if (!task) {
      return res.status(404).json({ message: "Problem adding task" });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
