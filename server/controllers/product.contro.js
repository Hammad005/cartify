import cloudinary from "../library/cloudinary.js";
import Product from "../models/Product.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).send({ error: error.message || "Internal Server Error" });
  }
};
export const createProduct = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res
        .status(401)
        .json({ error: "Unauthorized, You are not an admin" });
    }
    const { name, price, description, colors, sizes, category, image } =
      req.body;

    const cloudinaryResponse = await cloudinary.uploader.upload(image, {
      folder: "Cartify/Products",
    });
    if (!cloudinaryResponse || cloudinaryResponse.error) {
      throw new Error(cloudinaryResponse.error || "Unknown Cloudinary Error");
    }
    const colorsArray = colors.split(",");
    const sizesArray = sizes.split(",");
    const newProduct = new Product({
      name,
      price,
      description,
      colors: colorsArray,
      sizes: sizesArray,
      category,
      image: {
        imageId: cloudinaryResponse.public_id,
        imageUrl: cloudinaryResponse.secure_url,
      },
    });
    await newProduct.save();
    res
      .status(201)
      .json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    console.error("Error adding product:", error.message);
    res.status(500).send({ error: error.message || "Internal Server Error" });
  }
};
export const updateProduct = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res
        .status(401)
        .json({ error: "Unauthorized, You are not an admin" });
    }
    const { name, price, description, colors, sizes, category, image } =
      req.body;
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ error: "Product not found or already deleted" });
    }

    if (image) {
      //delete product image from cloudinary
      await cloudinary.uploader.destroy(product.image.imageId);

      const cloudinaryResponse = await cloudinary.uploader.upload(image, {
        folder: "Cartify/Products",
      });
      if (!cloudinaryResponse || cloudinaryResponse.error) {
        throw new Error(cloudinaryResponse.error || "Unknown Cloudinary Error");
      }
      await Product.findByIdAndUpdate(
        req.params.id,
        {
          name,
          price,
          description,
          colors: colors.split(","),
          sizes: sizes.split(","),
          category,
          image: {
            imageId: cloudinaryResponse.public_id,
            imageUrl: cloudinaryResponse.secure_url,
          },
        },
        { new: true }
      );
      return res.status(200).json({ message: "Product updated successfully" });
    }

    await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        price,
        description,
        colors: colors.split(","),
        sizes: sizes.split(","),
        category,
      },
      { new: true }
    );
    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    console.error("Error updating product:", error.message);
    res.status(500).send({ error: error.message || "Internal Server Error" });
  }
};
export const deleteProduct = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res
        .status(401)
        .json({ error: "Unauthorized, You are not an admin" });
    }
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ error: "Product not found or already deleted" });
    }
    //delete product image from cloudinary
    await cloudinary.uploader.destroy(product.image.imageId);
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error.message);
    res.status(500).send({ error: error.message || "Internal Server Error" });
  }
};
