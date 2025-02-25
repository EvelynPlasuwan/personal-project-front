import axios from "axios";

export const actionRegister = async (value) => {
  return await axios.post("http://localhost:8899/register", value);
};

export const actionLogin = async (value) => {
  return await axios.post("http://localhost:8899/login", value);
};

export const actionGetme = async (token) => {
  return await axios.get("http://localhost:8899/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
