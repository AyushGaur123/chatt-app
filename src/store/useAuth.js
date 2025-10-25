
import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { toast } from "react-hot-toast";
import { io } from "socket.io-client";

const URL = "https://chattapp-backend-stgw.onrender.com";
// const URL = "http://localhost:3000";

export const useAuth = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      set({ isCheckingAuth: true });
      const res = await axiosInstance.get("/auth/check", {
        withCredentials: true, // send cookies
      });
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.error("Error in checkAuth:", error.message);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data, {
        withCredentials: true,
      });
       localStorage.setItem("authdata",res.data);
      set({ authUser: res.data });
      toast.success("Signup successful");
      get().connectSocket();
    } catch (error) {
      console.error("Error in signup:", error.message);
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data, {
        withCredentials: true,
      });
      // console.log(data)
      toast.success("login successfull")
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.error("Error in login:", error.message);
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout", {}, { withCredentials: true });
      set({ authUser: null });
      toast.success("Logout successful");
      get().disconnectSocket();
    } catch (error) {
      console.error("Error in logout:", error.message);
      alert(error.response?.data?.message || "Logout failed");
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error in updateProfile:", error.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: () => {
    const { authUser, socket } = get();
    if (!authUser || socket?.connected) return;

    const newSocket = io(URL, {
      query: {
        userId: authUser._id,
      },
    });
    newSocket.connect();
    set({ socket: newSocket });

    newSocket.on("getOnlineUsers", (usersIds) => {
      set({ onlineUsers: usersIds });
    });
  },

  disconnectSocket: () => {
    const { socket } = get();
    if (socket?.connected) socket.disconnect();
  },
}));
