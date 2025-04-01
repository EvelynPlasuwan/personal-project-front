import axios from 'axios';

const API_URL = 'http://localhost:8899';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to request
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

api.interceptors.request.use((config) => {
  const authStore = localStorage.getItem('auth-store');
  if (authStore) {
    const parsedStore = JSON.parse(authStore);
    if (parsedStore.state.token) {
      config.headers.Authorization = `Bearer ${parsedStore.state.token}`;
    }
  }
  return config;
});


export const getUsers = async () => {
  const response = await api.get('/api/users/all')
  return response.data;
};

export const updateUserRole = async (userId, role) => {
  const response = await api.patch(`/api/users/${userId}/role`, { role });
  return response.data;
};

export const deleteUser = async (userId) => {
  const response = await api.delete(`/api/users/${userId}`);
  return response.data;
};