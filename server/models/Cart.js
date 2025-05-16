import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    items:
        [{
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },
            productColor: {
                type: String,
                required: true,
            },
            productSize: {
                type: String,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                min: 1,
            },
            addedAt: {
                type: Date,
                default: Date.now,
            },
        }],
    totalPrice: {
        type: Number,
        required: true,
        default: 0,
    },
}, {timestamps: true});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;