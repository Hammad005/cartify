import Cart from "../models/Cart.js";
import Order from "../models/Order.js";

export const createOrder = async (req, res) => {
  const { products, userAddressId, totalAmount, paymentMethod } = req.body;
  const user = req.user;

  try {
    const order = new Order({
      userId: user._id,
      products,
      userAddressId,
      totalAmount,
      paymentMethod,
    });
    await order.save();
    const cart = await Cart.findOneAndDelete({ userId: user._id });
    if (cart) {
      return res.status(200).json({ message: "Order Placed successfully" });
    }
  } catch (error) {
    console.error("Error creating order:", error.message);
    res.status(500).send({ error: error.message || "Internal Server Error" });
  }
};

export const getUserAllOrders = async (req, res) => {
  const user = req.user;
  try {
    const orders = await Order.find({ userId: user._id })
      .sort({ createdAt: -1 })
      .populate({
        path: "products.productId",
        select: "image name price category",
      })
      .populate("userAddressId");
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error.message);
    res.status(500).send({ error: error.message || "Internal Server Error" });
  }
};

export const cancelOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findByIdAndDelete(id);
    if (!order) {
      return res.status(404).json({ error: "Order not found or already deleted" });
    }
    res.status(200).json({ message: "Order cancelled successfully" });
  } catch (error) {
    console.error("Error deleting order:", error.message);
    res.status(500).send({ error: error.message || "Internal Server Error" });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .sort({ createdAt: -1 })
      .populate({
        path: "products.productId",
        select: "image name price category",
      })
      .populate("userAddressId").populate({
        path: "userId",
        select: "name email",
      });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error.message);
    res.status(500).send({ error: error.message || "Internal Server Error" });
  }
};

export const changeStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  
  try {
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    order.status = status;
    await order.save();
    res.status(200).json({ message: "Order status updated successfully" });
  } catch (error) {
    console.error("Error updating order status:", error.message);
    res.status(500).send({ error: error.message || "Internal Server Error" });
  }
};