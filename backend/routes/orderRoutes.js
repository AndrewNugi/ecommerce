import express from "express";
const router = express.Router();

import {
  createOrder,
  getAllOrders,
  getUserOrders,
  countTotalOrders,
  calculateTotalSales,
  calculateTotalSalesByDate,
  findOrderById,
  markOrderAsDelivered,
  requestOrderPayment,
  markOrderAsPaid,
} from "../controllers/orderController.js";

import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

// Create an order (User)
router.route("/").post(authenticate, createOrder);

// Get all orders (Admin)
router.route("/").get(authenticate, authorizeAdmin, getAllOrders);

// Get logged-in user’s orders
router.route("/myorders").get(authenticate, getUserOrders);

// Get total order count (Admin)
router.route("/total-orders").get(authenticate, authorizeAdmin, countTotalOrders);

// Get total sales (Admin)
router.route("/total-sales").get(authenticate, authorizeAdmin, calculateTotalSales);

// Get sales by date (Admin)
router.route("/total-sales-by-date").get(authenticate, authorizeAdmin, calculateTotalSalesByDate);

// Get order by ID (User/Admin)
router.route("/:id").get(authenticate, findOrderById);

// Mark order as delivered (Admin)
router.route("/:id/deliver").put(authenticate, authorizeAdmin, markOrderAsDelivered);

// Request payment after delivery (Admin)
router.route("/:id/request-payment").post(authenticate, authorizeAdmin, requestOrderPayment);

// Mark order as paid manually (Admin)
router.route("/:id/mark-paid").put(authenticate, authorizeAdmin, markOrderAsPaid);

export default router;
