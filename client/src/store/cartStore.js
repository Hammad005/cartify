import { toast } from "sonner";
import axios from "../lib/axios";
import { create } from "zustand";

export const cartStore = create((set, get) => ({
    cart: null,
    cartloading: false,

  addToCart: async (data) => {
    set({ cartloading: true });
    try {
      const response = await axios.post("/cart/addToCart", data);
      set({ cartloading: false });
      get().getCart();
      toast.success(response.data.message);
    } catch (error) {
      set({ cartloading: false });
      toast.error(error.response.data.error || "An error occurred");
    }
  },

  getCart: async () => {
    set({ cartloading: true });
    try {
      const response = await axios.get("/cart/getCart");
      set({ cart: response.data, cartloading: false });
    } catch (error) {
      set({ cartloading: false });
      toast.error(error.response.data.error || "An error occurred");
    }
  },

  incrementQuantity: async (id, productPrice) => {
    set({ cartloading: true });
    try {
      await axios.put(`/cart/incrementQuantity/${id}`, {
       productPrice
      });
      set({ cartloading: false });
      get().getCart();
    } catch (error) {
      set({ cartloading: false });
      toast.error(error.response.data.error || "An error occurred");
    }
  },

  decrementQuantity: async (id, productPrice) => {
    set({ cartloading: true });
    try {
      await axios.put(`/cart/decrementQuantity/${id}`, {
        productPrice
      });
      set({ cartloading: false });
      get().getCart();
    } catch (error) {
      set({ cartloading: false });
      toast.error(error.response.data.error || "An error occurred");
    }
  },
  removeFromCart: async (id, productColor, productSize, totalPrice) => {
    set({ cartloading: true });
    try {
      const response = await axios.delete(`/cart/removeFromCart/${id}`, {
        data: { productColor, productSize, totalPrice },
      });
      set({ cartloading: false });
      get().getCart();
      toast.success(response.data.message);
    } catch (error) {
      set({ cartloading: false });
      toast.error(error.response.data.error || "An error occurred");
    }
  }
}));
