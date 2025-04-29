import axios from "axios";
import { useNavigate } from 'react-router-dom';

export interface LoginData {
  Username: string;
  Password: string;
}



export interface LoginResponse {
  message: string;
  username: string;
  roles: string[]; // Roles dizisi
}   


export const LoginUser = async (userData: LoginData) => {
  // eslint-disable-next-line no-debugger
  debugger
  try {
    // Kullanıcı giriş yapıyor
    const loginResponse = await axios.post(`http://localhost:5001/api/Login`, {
      Username: userData.Username,
      Password: userData.Password,
    });

    if (loginResponse.status === 200) {
      // Token alma isteği
      
      const role=loginResponse.data.roles[0]; 
      const tokenResponse = await axios.post(
        `http://localhost:5001/connect/token`,
        new URLSearchParams({
          grant_type: "password", // Ya da "client_credentials"
          client_id: role+"Id",  // Identity Server'daki client_id
          client_secret: "ChatbotSecret", // Eğer gerekliyse
          username: userData.Username,  // Eğer password grant kullanıyorsan
          password: userData.Password,  // Eğer password grant kullanıyorsan
        })
      );
      sessionStorage.setItem("access_token", tokenResponse.data.access_token);    
      const token=sessionStorage.getItem("access_token"); 
      const response = await axios.get("https://localhost:7059/api/ChatbotResponses", {
        headers: {
          Authorization: `Bearer ${token}` // Token'ı Authorization header'ında gönderiyoruz
        }
      });      
      console.log("Token Response:", tokenResponse.data); // Token yanıtını konsola yazdır
      console.log("Response:", response.data); // Yanıtı konsola yazdır
      return loginResponse.data;
    } else {
      throw new Error("Giriş başarısız oldu.");
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.log("Hata Detayı:", error.response);
      if(error.response.data === "Kullanıcı adı veya şifre yanlış"){
      alert("❗ This email address is not associated with an existing account. \n📩 You are being redirected to the registration page to create a new account...");
      throw new Error("No Registered User Found");

    }
    } else {
      throw new Error("Network error. Please check your connection.");
    }
  }
};
