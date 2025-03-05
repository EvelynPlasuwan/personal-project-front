import axios from "axios";

const API_BASE_URL = "http://localhost:8899";

export const actionRegister = async (value) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/auth/register`, value);
    return response;
  } catch (error) {
    // จัดการ error แทนที่จะ throw โดยตรง
    console.error("Registration error:", error);
    return { error: error.message || "Registration failed" };
  }
};

// export const actionLogin = async (value) => {
//   return await axios.post("http://localhost:8899/login", value);
// };
export const actionLogin = async (value) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/auth/login`, value);
    return response;
  } catch (error) {
    console.error("Login error:", error);
    return { error: error.message || "Login failed" };
  }
};


export const actionGetme = async (token) => {
  if (!token) {
    return { error: "No token provided" };
  }
  
  console.log("Token being sent:", token);
  
  try {
    return await axios.get(`${API_BASE_URL}/api/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Get user data error:", error);
    return { error: error.message || "Failed to fetch user data" };
  }
};


export const actionCreateEvent = async (token, value) => {
  console.log(value)
  console.log("Event data being sent:", value);

  if (!token) {
    return { error: "No token provided" };
  }
  
  try {
    console.log('Sending request with token:', token);
    const response = await axios.post(`${API_BASE_URL}/api/events`, value, {
      headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
      },
  });
    return { data: response.data };
  } catch (error) {
      console.error("Create event error:", error);
      return { 
          error: error.response?.data?.error || 
                 error.message || 
                 "Failed to create event" 
      };
  }
};  // สร้าง function สำหรับสร้าง event โดยส่ง token และข้อมูล event ไปด้วย