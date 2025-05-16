import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    colors: {
      type: [String],
    },
    sizes: {
      type: [String],
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      imageId: {
        type: String,
      },
      imageUrl: {
        type: String,
      },
    },
    category: {
      type: String,
      required: true,
      enum: ["Pants", "T-Shirts", "Shoes", "Bags", "Hoodies", "Accessories"],
    },
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model("Product", productSchema);
export default Product;
