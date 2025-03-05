import axios from "axios";
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"


// Zustand Store สำหรับจัดการข้อมูลผู้ใช้

const useUserStore = create (
    persist(
        (set,get) => ({
// State สำหรับเก็บข้อมูลผู้ใช้
            
            user: null,
            token: "",

            // ฟังก์ชันสำหรับการ login
            login: async (input) => {
 // ส่ง request ไปยัง endpoint login
 const rs = await axios.post("http://localhost:8899/login", input);
 // เก็บข้อมูล token และ user ที่ได้จาก response
 set({ token: rs.data.token, user: rs.data.user});
 return rs.data;
            },

             // ฟังก์ชันสำหรับการ logout - ล้างข้อมูล token และ user
             logout: () => set({token: "", user: null }),

               // ฟังก์ชันสำหรับเรียกใช้จากภายนอก (action)
               actionLogout: () => {
                const { logout } = get();
                logout();
                return true;
               }
        }),
        {
            name: "state",
            storage: createJSONStorage(() => localStorage)
        }
    )
);

export default useUserStore;