import express from "express";
const router = express.Router();
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  deleteAUser,
  getUserById,
  updateAUser,
} from "../controllers/userController.js";
import { protect, forAdmin } from "../middlewares/authMiddlewares.js";

router.route("/").post(registerUser).get(protect, forAdmin, getAllUsers);
router.post("/login", authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router
  .route("/:id")
  .delete(protect, forAdmin, deleteAUser)
  .get(protect, forAdmin, getUserById)
  .put(protect, forAdmin, updateAUser);

export default router;
