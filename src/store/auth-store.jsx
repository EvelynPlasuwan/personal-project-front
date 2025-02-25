import axios from "axios";
import { create } from "zustand"
import { persist } from "zustand/middleware"
import { actionLogin } from "../api/auth"

const authStore = (set) => ({
    user: [],
    token: null,
    actionLogin_: async (value) => {
        try {
            const res = await actionLogin(value)
            const { result, token } = res.data;
            set({ token: token, user: result})

            return { success: true, role: result.role}
        } catch (error) {
            // console.log(error.response.data.message)
            return { success: false, error: error.response.data.message}
        }
    }
})

const useAuthStore = create(persist(authStore, { name: "auth-store"}));

export default useAuthStore;