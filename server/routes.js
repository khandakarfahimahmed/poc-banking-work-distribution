require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const userController = require("./controllers/user.controller");

router.get("", userController.getAllUser);
router.post("", userController.signUp);
router.post("/login", userController.signIn);
router.post("/dashboard", userController.verifyToken, (req, res) => {
  jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: "Invalid token",
      });
    } else {
      res.json({
        success: true,
        message: "Token verified",
        authData: authData,
      });
    }
  });
});
router.get("/tasks", userController.getAllTasks);
router.post("/tasks", userController.addTask);
router.post("/taskinfo", userController.addTaskInfo);
router.get("/taskinfo", userController.getAllTaskInfo);

module.exports = router;
