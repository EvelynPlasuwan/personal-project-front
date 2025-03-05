// import axios from "axios";
// import { create } from "zustand"
// import { persist } from "zustand/middleware"
// import { actionLogin } from "../api/auth"

// const authStore = (set) => ({
//     user: [],
//     token: null,
//     actionLoginWithZustand: async (value) => {
//         try {
//             const res = await actionLogin(value)
//             const { payload, token } = res.data;
//             set({ user: payload, token: token})

//             return { success: true, role: payload.role}
//         } catch (error) {
//             // console.log(error.response.data.message)
//             return { success: false, error: error.response.data.message}
//         }
//     },

//     actionLogout: () => {
//         set({ user: [], token: null });
//     },
    
// })

// const useAuthStore = create(persist(authStore, { name: "auth-store"}));

// export default useAuthStore;

import axios from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { actionLogin } from "../api/auth";

const authStore = (set, get) => ({
  user: {},
  token: null,
  
  // เพิ่มฟังก์ชันตรวจสอบสถานะแบบอัตโนมัติ
  checkAuthStatus: () => {
    const token = localStorage.getItem('auth-token');
    const userData = localStorage.getItem('auth-user');
    
    if (token && userData) {
      set({
        token: token,
        user: JSON.parse(userData)
      });
      return true;
    }
    return false;
  },

  getUserRole: () => {
    const { user } = get();
   // ตรวจสอบว่า user มีค่าและไม่ใช่ array ว่าง
   return user && typeof user === 'object' && user.role ? user.role : null;
  },
  
  isAdmin: () => {
    const role = get().getUserRole();
    return role && role.toLowerCase() === 'admin';
  },
  
  isUser: () => {
    const role = get().getUserRole();
    return role && role.toLowerCase() === 'user';
  },
  
  isAuthenticated: () => {
    return get().token !== null;
  },
  
  actionLoginWithZustand: async (value) => {
    try {
      const res = await actionLogin(value);
      const { payload, token } = res.data;
      
      // เก็บข้อมูลใน localStorage
      localStorage.setItem('auth-token', token);
      localStorage.setItem('auth-user', JSON.stringify(payload));
      
      set({ user: payload, token: token });
      
      return { success: true, role: payload.role };
    } catch (error) {
      // console.log(error.response.data.message);
      // return { success: false, error: error.response.data.message };
            // ตรวจสอบว่า error.response มีอยู่จริงหรือไม่
            const errorMessage = error.response?.data?.message || "เกิดข้อผิดพลาดในการเข้าสู่ระบบ";
            return { success: false, error: errorMessage };
    }
  },
  
  actionLogout: () => {
    // ลบข้อมูลออกจาก localStorage ด้วย
    localStorage.removeItem('auth-token');
    localStorage.removeItem('auth-user');
    
    set({ user: [], token: null });
  },
  
  // เพิ่มฟังก์ชันตรวจสอบว่าผู้ใช้ล็อกอินอยู่หรือไม่
  // isAuthenticated: () => {
  //   return get().token !== null;
  // }
});

// แก้ไข persistence options เพื่อรองรับการเก็บข้อมูลใน localStorage
const useAuthStore = create(
  persist(authStore, { 
    name: "auth-store",
    // กำหนดให้เก็บเฉพาะ state ที่ต้องการ
    partialize: (state) => ({ 
      user: state.user,
      token: state.token 
    })
  })
);

export default useAuthStore;