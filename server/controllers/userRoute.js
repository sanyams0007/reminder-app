const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;

      //if email or password is empty
      if (!email || !password)
        return res.status(400).json({ msg: "Please enter all fields" });

      let user = await userModel.findOne({ email: email });

      //if user doesn't exist
      if (!user) return res.status(400).json({ msg: "Invalid credentials" });

      //if password doesn't match
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

      /* create a token */
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: 360000,
      });

      /* sends back created user data in response */
      res.json({
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
        },
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  registerUser: async (req, res) => {
    const { name, email, phone, password, confirm_password } = req.body;
    const strongRegx = /^(.{0,5}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$/;
    try {
      // if any field is blank
      if (!name || !email || !password || !confirm_password || !phone)
        return res.status(400).json({ msg: "Please enter all fields" });

      //if passwords doesn't match
      if (password !== confirm_password)
        return res.status(400).json({ msg: "Please enter matching password" });

      //if password length is less than 5
      if (password.length <= 5)
        return res
          .status(400)
          .json({ msg: "Password must be Min. 6 chararcters long" });

      /* checks if password doesn't contain min 1 upper, lower, special char and number  */
      if (strongRegx.test(password))
        return res.status(400).json({
          msg:
            "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character",
        });

      //if user already exists then
      let user = await userModel.findOne({ email });
      if (user)
        return res
          .status(400)
          .json({ msg: "An account with this email already exist" });

      //converting pasword into hash
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);

      //else if new user then save it to db
      user = new userModel({
        name,
        email,
        phone,
        password: passwordHash,
      });

      const savedUser = await user.save();

      /* create a token 
         const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, {
         expiresIn: 360000
       });
       res.json({
         token,
         user: {
           name: user.name,
           email: user.email,
         },
       }); */

      res.json({
        /* id: user._id, */
        name,
        email,
        phone,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  updateUser: (req, res) => {
    try {
      res.send("HI IT'S A PATCH REQUEST");
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  deleteUser: async (req, res) => {
    const { user: _id } = req;
    try {
      const deletedUser = await userModel.findByIdAndRemove({ _id: _id });
      res.json(deletedUser);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  tokenIsValid: async (req, res) => {
    try {
      const token = req.header("x-auth-token");
      if (!token) return res.json(false);

      const verified = jwt.verify(token, process.env.JWT_SECRET);
      if (!verified) return res.json(false);

      const user = await userModel.findById(verified.id);
      if (!user) return res.json(false);

      return res.json(true);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  loggedUser: async (req, res) => {
    try {
      const user = await userModel.findById(req.user);
      res.json({
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};
