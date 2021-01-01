const express = require("express");
/* import { getUser } from '../controllers/userRoute.js' */
const router = new express.Router();
const {
  loginUser,
  loggedUser,
  registerUser,
  updateUser,
  deleteUser,
  tokenIsValid,
} = require("../controllers/userRoute");
const auth = require("../middleware/auth");


//@ ROUTE = /users/
/* router.get('/', loginUser) = router.get('/user', loginUser) */
router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/tokenIsValid", tokenIsValid);

/* Private Route, Logged in Users can access it*/
router.get("/", auth, loggedUser);
router.patch("/", auth, updateUser);
router.delete("/", auth, deleteUser);


module.exports = router;
