const bcrypt = require("bcrypt");
const Users = require("../Modules/users.module");
const jwt = require("jsonwebtoken");
const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: maxAge,
  });
};

const signIn = async (req,res )=>{
   try {
    const {email , password} = req.body;
        const user = await Users.findOne({email});
        if(!user){
            return res.status(400).send({
                status: 400,
                msg: "invalid email or password",
              });
        }
        const auth = await bcrypt.compare(password, user.password);

        if (auth) {
            const token = createToken(user._id);
            res.cookie("token", token, { httpOnly: true, maxAge: maxAge * 1000 });
            const { _id, username, email, role } = user; // Clean user data
            return res.status(200).send({
              status: 200,
              success : true,
              data: { _id, username, email, role },
              msg : "Logged in successfully!"
            });
          } else {
            return res.status(400).send({
              status: 400,
              msg: "Incorrect password",
            });
          }
   } catch (error) {
    res.status(500).send({
        status :500,
        msg : "server error",
    });
   }
};




const signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if email already exists
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.status(400).send({
        status: 400,
        msg: "Email already in use",
      });
    }

    // Create new user
    const newUser = new Users({
      username,
      email,
      password,
      role:"customer", // Default to customer 
    });

    await newUser.save();

    const { _id, role: userRole } = newUser;

    res.status(201).send({
      status: 201,
      success: true,
      data: { _id, username, email, role: userRole },
      msg: "User registered successfully",
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      msg: "Server error",
      error: error.message,
    });
  }
};


const signOut = async (req, res) => {
    res.cookie("token", "", { maxAge: 1 });
    res.status(200).send({
      status: 200,
      success: true,
      msg: "User signed out successfully",
    });
  };


module.exports = { signIn, signOut, signUp };