import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";

// @desc Auth user & Get token
// @route POST /api/users/login
// @access Public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isMerchant: user.isMerchant,
      token: generateToken(user._id),
    });
  } else {
    return res.status(401).json({ message: "Invalid email or password" });
  }
});

// @desc Register new user
// @route POST /api/users
// @access Public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res
      .status(400)
      .json({ message: "User with this email already exists" });
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isMerchant: user.isMerchant,
      token: generateToken(user._id),
    });
  } else {
    return res.status(404).json({ message: "User not found" });
  }
});

// @desc Get user profile
// @route GET /api/users/profile
// @access Private

const getUserProfile = asyncHandler(async (req, res) => {
  // console.log("user ID here : ", req.user._id);
  User.findOne({ _id: req.user._id }, (err, result) => {
    if (err) throw err;
    // console.log("user Info as Result : ", result);
    return res.json(result);
  });
});

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private

const updateUserProfile = asyncHandler(async (req, res) => {
  // console.log("user ID here : ", req.user._id);
  User.findOne({ _id: req.user._id }, (err, result) => {
    if (err) throw err;
    // console.log("user Info as Result : ", result);
    const user = result;
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = user.save();

    return res.json(updatedUser);
    // return res.json({
    //   _id: updatedUser._id,
    //   name: updatedUser.name,
    //   email: updatedUser.email,
    //   isAdmin: updatedUser.isAdmin,
    //   token: generateToken(updatedUser._id),
    // })
  });
});

// @desc Get all users
// @route GET /api/users
// @access Private (Admin)

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @desc Delete a users
// @route DELETE /api/users/:id
// @access Private (Admin)

const deleteAUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.json({
      message: "User removed.",
    });
  } else {
    res.status(404).json({
      message: "User not found.",
    });
  }
});

// @desc Get a user by Id
// @route GET /api/users/:id
// @access Private (Admin)

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    return res.json(user);
  } else {
    return res.status(404).json({
      message: "User not found.",
    });
  }
});

// @desc Update a user
// @route PUT /api/users/:id
// @access Private (Admin)

const updateAUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.isAdmin = req.body.isAdmin;
    user.isMerchant = req.body.isMerchant;

    const updatedUser = await user.save();
  
    return res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      isMerchant: updatedUser.isMerchant
    })
  } else {
    return res.status(404).json({
      message: "User not found.",
    });
  }
});

export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  deleteAUser,
  getUserById,
  updateAUser
};
