import express from "express";
const router = express.Router();
import {
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  createProduct,
  createProductReview,
  getTrendingProducts,
} from "../controllers/productController.js";
import { protect, forAdmin } from "../middlewares/authMiddlewares.js";

router.route("/").get(getProducts).post(protect, forAdmin, createProduct);
router.route("/").get(getProducts).post(protect, createProduct);
router.get('/trending', getTrendingProducts)
router.route("/:id/reviews").post(protect, createProductReview);
router
  .route("/:id")
  .get(getProductById)
  .delete(protect, forAdmin, deleteProduct)
  .put(protect, forAdmin, updateProduct);

export default router;
