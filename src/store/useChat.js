import { create } from "zustand"
import { axiosInstance } from "../lib/axios"
import { toast } from "react-hot-toast"
import { useAuth } from "./useAuth"


export const userChat = create((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUserLoading: false,
    isMessagesLoading: false,

    getUsers: async () => {
        set({ isUserLoading: true })
        try {
            const res = await axiosInstance.get("/messages/users");
            set({ users: res.data })
        } catch (error) {
            toast.error(error.response.data.message || "Can't fetch users")
        } finally {
            set({ isUserLoading: false })
        }
    },



    getMessage: async (userId) => {
        set({ isMessagesLoading: true })
        try {
            const res = await axiosInstance.get(`/messages/${userId}`)
            set({ messages: res.data })

        } catch (error) {
            toast.error(error.response.data.message)

        } finally {
            set({ isMessagesLoading: false })

        }
    },

    clearChat: async () => {
        const { selectedUser } = get();

        if (!selectedUser) {
            toast.error("No user selected");
            return;
        }

        try {
            await axiosInstance.delete(`/messages/clear/${selectedUser._id}`);
            set({ messages: [] });
            toast.success("Chat cleared permanently");
        } catch (error) {
            toast.error(
                error?.response?.data?.message || "Failed to clear chat"
            );
        }
    },


    sendMessage: async (messageData) => {
        const { selectedUser, messages } = get()
        try {
            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
            set({ messages: [...messages, res.data] })
        } catch (error) {
            toast.error(error.response.data.message)

        }
    },

    subscribeToMessages: () => {
        const { selectedUser } = get()
        if (!selectedUser) return

        const socket = useAuth.getState().socket;

        socket.on("newMessage", (newMessage) => {
            set({ messages: [...get().messages, newMessage] })
        })
    },

    unSubscribeFromMessages: () => {
        const socket = useAuth.getState().socket;
        socket.off("newMessage")
    },

    setSelectedUser: (selectedUser) => set({ selectedUser })


}))

