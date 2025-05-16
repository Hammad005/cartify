import { toast } from "sonner";
import axios from "../lib/axios";
import { create } from "zustand";

export const addressStore = create((set, get) => ({
    address: null,
    addressloading: false,

  createAddress: async (data) => {
    set({ addressloading: true });
    try {
      const response = await axios.post("/address/createAddress", data);
      set({ addressloading: false });
      get().getAddress();
      toast.success(response.data.message);
    } catch (error) {
      set({ addressloading: false });
      toast.error(error.response.data.error || "An error occurred");
    }
  },

  getAddress: async () => {
    set({ addressloading: true });
    try {
      const response = await axios.get("/address/getAddress");
      set({ address: response.data, addressloading: false });
    } catch (error) {
      set({ addressloading: false });
      toast.error(error.response.data.error || "An error occurred");
    }
  },

  deleteAddress: async (id) => {
    set({ addressloading: true });
    try {
      await axios.delete(`/address/deleteAddress/${id}`);
      set({ addressloading: false });
      get().getAddress();
      toast.success("Address deleted successfully");
    } catch (error) {
      set({ addressloading: false });
      toast.error(error.response.data.error || "An error occurred");
    }
  }
}));
