import { toast } from "sonner";
import axios from "../lib/axios";
import { create } from "zustand";

export const productsStore = create((set, get) => ({
    products: null,
    productloading: false,

  createProduct: async (data) => {
    set({ productloading: true });
    try {
      const response = await axios.post("/products/createProduct", data);
      set({ productloading: false });
      get().getAllProducts();
      toast.success(response.data.message);
    } catch (error) {
      set({ productloading: false });
      toast.error(error.response.data.error || "An error occurred");
    }
  },

  getAllProducts: async () => {
    set({ productloading: true });
    try {
      const response = await axios.get("/products/getAllProducts");
      set({ products: response.data, productloading: false });
    } catch (error) {
      set({ productloading: false });
      toast.error(error.response.data.error || "An error occurred");
    }
  },

  updateProduct: async (id, data) => {
    set({ productloading: true });
    try {
      const response = await axios.put(`/products/updateProduct/${id}`, data);
      set({ productloading: false });
      get().getAllProducts();
      toast.success(response.data.message);
    } catch (error) {
      set({ productloading: false });
      toast.error(error.response.data.error || "An error occurred");
    }
  },

  deleteProduct: async (id) => {
    set({ productloading: true });
    try {
      await axios.delete(`/products/deleteProduct/${id}`);
      set({ productloading: false });
      get().getAllProducts();
      toast.success("Product deleted successfully");
    } catch (error) {
      set({ productloading: false });
      toast.error(error.response.data.error || "An error occurred");
    }
  }
}));
