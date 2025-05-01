import { useState, useEffect } from "react";
import axios from "axios";

interface UseUserByIdProps {
  userId: string;
  setUser: (value: any) => void; // Tipini `User` olarak özelleştirebilirsin
  setIsEmailLogin: (value: boolean) => void;
}

export const useUserById = ({ userId, setUser,setIsEmailLogin }: UseUserByIdProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const fetchUser = async () => {
    // eslint-disable-next-line no-debugger
    debugger
    if (!userId) return;

    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5001/api/User/${userId}`);

      const hasEmailLogin = /\.\d{21}$/.test(response.data.username); // Nokta sonrası tam olarak 18 haneli sayı kontrolü

      if(hasEmailLogin){

      setUser({
        name: response.data.username.split('.')[0] || "null",
        email: response.data.email || "null",
        role: response.data.roles[0],
        joinDate: "January 1, 2023",
        profileImage: ""
      });
    
      setIsEmailLogin(true);
    }
      else{
        setUser({
          name: response.data.username || "null",
          email: response.data.email || "null",
          role: response.data.roles[0],
          joinDate: "January 1, 2023",
          profileImage: ""
        });
        setIsEmailLogin(false);
      }
      // dışarıdan verilen setter fonksiyonu
      setError("");
    } catch (err) {
      console.error("Kullanıcı bilgisi alınamadı:", err);
      setUser(null);
      setError("Kullanıcı bilgisi alınamadı.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const refetch = async () => {
    await fetchUser();
  };

  return { loading, error, refetch };
};
