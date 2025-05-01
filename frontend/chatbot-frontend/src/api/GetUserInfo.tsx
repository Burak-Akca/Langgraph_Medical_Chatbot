import axios from "axios";

export const getUserById = async (userId) => {
  try {
    const response = await axios.get(`http://localhost:5001/api/User/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Kullanıcı alınamadı:", error);
    throw new Error("Kullanıcı bilgisi alınamadı.");
  }
};
