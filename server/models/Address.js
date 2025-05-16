import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    appartment: {
        type: String,
    },
    city: {
        type: String,
        required: true,
    },
    postalCode: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
}, {timestamps: true});

const Address = mongoose.model("Addresse", addressSchema);

export default Address;