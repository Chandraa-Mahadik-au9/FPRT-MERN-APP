import express from "express";
const router = express.Router();
import { addOrderItems, getOrderById, UpdateOrderToPaid, UpdateOrderToDelivered, getMyOrders, getAllOrders } from "../controllers/orderController.js";
import { protect, forAdmin } from "../middlewares/authMiddlewares.js";

router.route("/myorders").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, UpdateOrderToPaid);
router.route("/:id/deliver").put(protect, forAdmin, UpdateOrderToDelivered);
router.route("/").post(protect, addOrderItems).get(protect, forAdmin, getAllOrders);

export default router;
