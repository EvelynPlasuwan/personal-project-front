import axios from "axios";
import { create } from "zustand"
import { persist } from "zustand/middleware"
import { actionLogin } from "../api/auth"

const authStore = (set) => ({
    user: [],
    token: null,
    actionLoginWithZustand: async (value) => {
        try {
            const res = await actionLogin(value)
            const { payload, token } = res.data;
            set({ user: payload, token: token})

            return { success: true, role: payload.role}
        } catch (error) {
            // console.log(error.response.data.message)
            return { success: false, error: error.response.data.message}
        }
    }
    
})

const useAuthStore = create(persist(authStore, { name: "auth-store"}));

export default useAuthStore;