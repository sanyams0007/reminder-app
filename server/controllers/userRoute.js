const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');


module.exports = {
    getUser: (req, res) => {
        try {
            res.send("HI IT'S A GET REQUEST")
        } catch (error) {
            res.status(400).send(error);
        }
    },
    postUser: async(req, res) => {
        /* console.log("HI IT'S A POST REQUEST"); */
        const { name, email, password, confirm_password } = req.body;
        const strongRegx = /^(.{0,5}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$/;
        try {
            // if any field is blank
            if (!name || !email || !password || !confirm_password)
                return res
                    .status(400)
                    .json({ msg: "Please enter all fields" });

            //if passwords doesn't match
            if (password !== confirm_password)
                return res
                    .status(400)
                    .json({ msg: "Please enter matching password" });

            //if password length is less than 5
            if (password.length <= 5)
                return res
                    .status(400)
                    .json({ msg: "Password must be Min. 6 chararcters long" });

            /* checks if password doesn't contain min 1 upper, lower, special char and number  */
            if (strongRegx.test(password))
            return res
            .status(400)
            .json({msg: "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character"});
            
            //if user already exists then
            let user = await userModel.findOne({ email:email })
            if (user)
                return res
                    .status(400)
                    .json({ msg: "An account with this email already exist" });

            //converting pasword into hash
            const salt = await bcrypt.genSalt(10);
            const passwordHash = await bcrypt.hash(password, salt);
            //console.log(passwordHash);

            //else if new user then save it
            user = new userModel({
                name,
                email,
                password:passwordHash,
            });

            const savedUser = await user.save();
            res.json(savedUser);

            //res.send("HI IT'S A ACCEPTABLE POST REQUEST");

        } catch (err) {
            res.status(500).json({error:err.message});
        }
    },
    patchUser: (req, res) => {
        try {
            res.send("HI IT'S A PATCH REQUEST")
        } catch (error) {
            res.status(400).send(error);
        }
    },

    deleteUser: (req, res) => {
        try {
            res.send("HI IT'S A DELETE REQUEST")
        } catch (error) {
            res.status(400).send(error);
        }
    },
}

/* module.exports.getUser = getUser;
module.exports.postUser = postUser;
module.exports.patchUser = patchUser;
module.exports.deleteUser = deleteUser; */