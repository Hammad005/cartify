import Cart from "../models/Cart.js";

export const addToCart = async (req, res) => {
  try {
    const { productId, productColor, productSize, quantity, totalPrice } = req.body;
    const user = req.user;
    
    let cart = await Cart.findOne({ userId: user._id });

    if (cart) {
      // Check if product already in cart
      const existingItemIndex = cart.items.findIndex(item =>
        item.productId.toString() === productId &&
        item.productColor === productColor &&
        item.productSize === productSize
      );

      if (existingItemIndex !== -1) {
        // Update quantity if product exists
        cart.items[existingItemIndex].quantity += quantity;
      } else {
        // Add new product to items array
        cart.items.push({ productId, productColor, productSize, quantity });
      }

      cart.totalPrice += totalPrice * quantity;
      await cart.save();
    } else {
      // Create new cart
      const newCart = new Cart({
        userId: user._id,
        items: [{ productId, productColor, productSize, quantity }],
        totalPrice: totalPrice * quantity,
      });
      await newCart.save();
    }

    res.status(200).json({ message: "Product added to cart successfully" });
  } catch (error) {
    console.error("Error adding product to cart:", error.message);
    res.status(500).send({ error: error.message || "Internal Server Error" });
  }
};

export const getCart = async (req, res) => {
  try {
    const user = req.user;
    const cart = await Cart.findOne({ userId: user._id }).populate({
      path: "items.productId",
      select: "image name price category",
    });
    if (cart) {
      // Sort items by addedAt descending
      cart.items.sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt));
    }
    res.status(200).json(cart);
  } catch (error) {
    console.error("Error fetching cart:", error.message);
    res.status(500).send({ error: error.message || "Internal Server Error" });
  }
};
export const removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;

    const cart = await Cart.findOne({ userId: user._id });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    const filterdItems = cart.items.filter(
      item => item.productId.toString() !== id ||
      item.productColor !== req.body.productColor ||
      item.productSize !== req.body.productSize
    )
    cart.items = filterdItems;
    cart.totalPrice -= req.body.totalPrice;
    await cart.save();

    if (cart.items.length === 0) {
      await Cart.findByIdAndDelete(cart._id);
    }
    res.status(200).json({ message: "Product removed from cart successfully" });
  } catch (error) {
    console.error("Error removing product from cart:", error.message);
    res.status(500).send({ error: error.message || "Internal Server Error" });
  }
};
export const incrementQuantity = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;
    const {productPrice} = req.body    

    const cart = await Cart.findOne({ userId: user._id });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    const existingItemIndex = cart.items.findIndex(
      item => item.productId.toString() === id
    );

    if (existingItemIndex !== -1) {
      cart.items[existingItemIndex].quantity += 1;
      cart.totalPrice += productPrice;
      await cart.save();
      return res.status(200).json({ message: "Product quantity incremented" });
    } else {
      return res.status(404).json({ error: "Product not found in cart" });
    }

  } catch (error) {
    console.error("Error incrementing product quantity:", error.message);
    res.status(500).send({ error: error.message || "Internal Server Error" });
  }
};

export const decrementQuantity = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;
    const {productPrice} = req.body

    const cart = await Cart.findOne({ userId: user._id });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    const existingItemIndex = cart.items.findIndex(
      item => item.productId.toString() === id
    );

    if (existingItemIndex !== -1) {
      cart.items[existingItemIndex].quantity -= 1;
      cart.totalPrice -= productPrice;
      await cart.save();
      return res.status(200).json({ message: "Product quantity decremented" });
    } else {
      return res.status(404).json({ error: "Product not found in cart" });
    }

  } catch (error) {
    console.error("Error decrementing product quantity:", error.message);
    res.status(500).send({ error: error.message || "Internal Server Error" });
  }
};
