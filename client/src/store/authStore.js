import { toast } from "sonner";
import axios from "../lib/axios";
import { create } from "zustand";

export const authStore = create((set, get) => ({
  user: null,
  loading: false,
  checkingAuth: false,
  clients: null,

  checkAuth: async () => {
    set({ checkingAuth: true });
    await new Promise((resolve) => setTimeout(resolve, 2000));
    try {
      const response = await axios.get("/auth/checkAuth");
      set({ user: response.data, checkingAuth: false });
    } catch (error) {
      set({ checkingAuth: false, user: null, error: error });
    } finally {
      set({ checkingAuth: false });
    }
  },
  signup: async (data) => {
    set({ loading: true });
    try {
      const response = await axios.post("/auth/signup", data);
      set({ user: response.data.user, loading: false });
      toast.success("Signup successful");

    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.error || "An error occurred");
    }
  },
  login: async (data) => {
    set({ loading: true });
    try {
      const response = await axios.post("/auth/login", data);
      set({ user: response.data.user, loading: false });
      if (get().user.role === "admin") {
        toast.success("Welcome Back Boss");
      } else {
        toast.success("Login successful");
      }
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.error || "An error occurred");
    }
  },

  logout: async () => {
    set({ loading: true });
    await new Promise((resolve) => setTimeout(resolve, 2000));
    try {
      await axios.post("/auth/logout");
      set({ user: null, loading: false });
      toast.success("Logout successful");
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.error || "An error occurred");
    }
  },

  updateUserName: async (id, name) => {
    try {
      const response = await axios.put(`/auth/updateUserName/${id}`, { name });
      set({ user: response.data });
      toast.success("Name updated successfully");
    } catch (error) {
      toast.error(error.response.data.error || "An error occurred");
    }
  },

  updateUserEmail: async (id, email) => {
    try {
      const response = await axios.put(`/auth/updateUserEmail/${id}`, { email });
      set({ user: response.data });
      toast.success("Email updated successfully");
    } catch (error) {
      toast.error(error.response.data.error || "An error occurred");
    }
  },

  getUsers: async () => {
    set({ loading: true });
    try {
      const response = await axios.get("/auth/getUsers");
      set({ clients: response.data, loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.error || "An error occurred");
    }
  }
}));
