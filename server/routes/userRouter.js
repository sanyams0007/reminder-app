const express = require("express");
/* import { getUser } from '../controllers/userRoute.js' */
const router = new express.Router();
const {
  getUser,
  postUser,
  patchUser,
  deleteUser,
  tokenIsValid,
} = require("../controllers/userRoute");
const auth = require("../middleware/auth");

/* router.get('/', getUser) = router.get('/user', getUser) */
router.get("/", getUser);
router.post("/", postUser);
router.patch("/", patchUser);
router.delete("/", auth, deleteUser);
router.post("/tokenIsValid", tokenIsValid);

module.exports = router;
