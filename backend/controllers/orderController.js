import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

// @desc Create new order
// @route POST /api/orders
// @access Private

const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400).json({
      message: "No items in order.",
    });
    return;
  } else {
    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

// @desc Get order by id
// @route GET /api/orders/:id
// @access Private

const getOrderById = asyncHandler(async (req, res) => {
  console.log(req.params.id);
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404).json({
      message: "Order not found.",
    });
  }
});

// @desc Update order to paid
// @route PUT /api/orders/:id/pay
// @access Private
const UpdateOrderToPaid = asyncHandler(async (req, res) => {
  // console.log(req.params.id);
  const order = await Order.findById(req.params.id);
  // console.log(order)

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = order.save();

    return res.json(updatedOrder);
  } else {
    return res.status(404).json({
      message: "Order not found.",
    });
  }
});

// @desc Update order to delivered
// @route PUT /api/orders/:id/deliver
// @access Private (Admin)
const UpdateOrderToDelivered = asyncHandler(async (req, res) => {
  // console.log(req.params.id);
  const order = await Order.findById(req.params.id);
  // console.log(order)

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = order.save();

    return res.json(updatedOrder);
  } else {
    return res.status(404).json({
      message: "Order not found.",
    });
  }
});

// @desc Get logged in user orders
// @route GET /api/orders/myorders
// @access Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

// @desc Get all orders
// @route GET /api/orders
// @access Private (Admin)
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name");
  res.json(orders);
});

export {
  addOrderItems,
  getOrderById,
  UpdateOrderToPaid,
  UpdateOrderToDelivered,
  getMyOrders,
  getAllOrders,
};
