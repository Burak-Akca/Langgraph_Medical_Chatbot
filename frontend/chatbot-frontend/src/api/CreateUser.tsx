import axios from "axios";

export interface RegisterData {
  Username: string;
  Email: string;
  Password: string;
}

export const registerUser = async (userData: RegisterData) => {
  try {
    const response = await axios.post(`http://localhost:5001/api/Register`, {
      Username: userData.Username,
      Email: userData.Email,
      Password: userData.Password
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      // Server'dan gelen hata mesajlarını kontrol et
      const errorResponse = error.response.data["0"];
      console.log(errorResponse); // Hata mesajını konsola yazdır
      // DuplicateUserName hatasını kontrol et
      if (errorResponse && errorResponse.code   === 'DuplicateUserName') {
        throw new Error('User name is already taken. Please choose another one.');
      } else {
        // Diğer hatalar için genel mesaj
        throw new Error('Registration failed. Please try again.');
      }
    } else {
        throw new Error('Network error. Please check your connection.');
    }
  }
};
