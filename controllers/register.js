/**
 * This folder is used to control our data values.
 * Here, we check wheter the input email already exists or not.
 * If not, then hash the input password and store the user's data into the DB.
 */

const User = require("../models/user");
const bcrypt = require("bcrypt");
const saltRounds = 10;

// Take the input and save it into the DB.
const registerUser = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    const emailExist = await User.findOne({ where: { email } });
    if (emailExist) {
      res.status(401).send("Email already exists.");
    }
    // Hash the password (synchronously)
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt); // Hashed password

    /**
     * Add data to DB - Create and save the User
     * As per Rachit Sir,
     * const newUser = new User({ email: email, password: hash });
     * const savedUser = await newUser.save();
     *
     * As per Documentation,
     */
    const savedUser = await User.create({
      fullName: fullName,
      email: email.toLowerCase(),
      password: hash,
    });
    res.status(200).send(savedUser);
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong.");
  }
};

const registerSuperAdmin = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    const emailExist = await User.findOne({ where: { email } });
    if (emailExist) {
      res.status(401).send("Email already exists.");
    }

    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    // const savedUser = await User.create({
    //   fullName: fullName,
    //   email: email.toLowerCase(),
    //   password: hash,
    //   role: "super-admin",
    // }); // Save to Postgres DB
    const newUser = new User({
      email: email,
      password: hash,
      fullName: fullName,
      role: "super-admin",
    });
    const savedUser = await newUser.save();
    req.session.User = savedUser; //save to Redis Store
    res.status(200).send(savedUser);
  } catch (err) {
    res.status(500).send("Something went wrong2.");
  }
};

module.exports = { registerUser, registerSuperAdmin };
// exports.x = register;
