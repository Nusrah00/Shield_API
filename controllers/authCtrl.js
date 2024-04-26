const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const registerUser = async (req, res) => {
  console.log(req.body);
  const { name, email, password } = req.body;

  if (!req.body) {
    return res.status(400).json({
      status: "false",
      msg: "Please enter all fields correctly",
    });
  }

  const user = await User.findOne({email});

  if (user) {
    return res.status(400).json({
      status: "false",
      msg: "Email already exists",
    });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    email,
    password: hashPassword,
   
  });

  await newUser.save();

  res.status(200).json({
    status: true,
    msg: "User registered successfully",
  });
};


const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // console.log(req.body);

    if (!email || !password) {
      return res
        .status(400)
        .json({ msg: " Please enter all fields correctly" });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({
        status: false,
        msg: "Incorrect email or password",
      });
    }
    // check if password is correct
    const isCorrect = await bcrypt.compare(password, user.password);
    // Employees.comparePassword(password);

    if (!isCorrect) {
      return res.status(400).json({
        status: false,
        msg: "Incorrect email or password",
      });
    }

    const payload = {
      email,
      name: user.name,
      id: user._id,
    };
    console.log(payload);

    const token = jwt.sign(payload, process.env.JWT_SECRET,{
    expiresIn:process.env.JWT_EXPIRES_TIME
    });

    const options = {
      expiresIn: 3600,
      //httpOnly : true,
    };

    res
      .cookie("token", token, options)
      .status(200)
      .json({
        status: true,
        data: token,
          
        
      });

    // sending token in cookie
    // sendToken(employee, 200, res);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: false,
      msg: "Something went wrong. Please try again",
    });
  }
};


module.exports = {
  registerUser, loginUser

}