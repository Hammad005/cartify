import { toast } from "sonner";
import axios from "../lib/axios";
import { create } from "zustand";

export const orderStore = create((set, get) => ({
    orders: null,
    orderloading: false,
    success: false,

    setSuccess: (value) => set({ success: value }),
    getUserAllOrders: async () => {
      set({ orderloading: true });
      try {
        const response = await axios.get("/orders/getUserAllOrders");
        set({ orders: response.data, orderloading: false });
      } catch (error) {
        set({ orderloading: false });
        toast.error(error.response.data.error || "An error occurred");
      }
    },

  createOrder: async (data) => {
    set({ orderloading: true });
    try {
      const response = await axios.post("/orders/createOrder", data);
      get().getUserAllOrders();
      toast.success(response.data.message);
      set({ orderloading: false, success: true });
    } catch (error) {
      set({ orderloading: false });
      toast.error(error.response.data.error || "An error occurred");
    }
  },

  cancelOrder: async (id) => {
    set({ orderloading: true });
    try {
      const response = await axios.put(`/orders/cancelOrder/${id}`);
      get().getUserAllOrders();
      toast.success(response.data.message);
      set({ orderloading: false });
    } catch (error) {
      set({ orderloading: false });
      toast.error(error.response.data.error || "An error occurred");
    }
  },

  getAllOrders: async () => {
    set({ orderloading: true });
    try {
      const response = await axios.get("/orders/getAllOrders");
      set({ orders: response.data, orderloading: false });
    } catch (error) {
      set({ orderloading: false });
      toast.error(error.response.data.error || "An error occurred");
    }
  },

  changeStatus: async (id, status) => {
    set({ orderloading: true });
    try {
      const response = await axios.put(`/orders/changeStatus/${id}`, {status});
      get().getAllOrders();
      toast.success(response.data.message);
      set({ orderloading: false });
    } catch (error) {
      set({ orderloading: false });
      toast.error(error.response.data.error || "An error occurred");
    }
  },
}));
