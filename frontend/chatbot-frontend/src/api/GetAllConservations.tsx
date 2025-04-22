import { useState, useEffect } from 'react';
import axios from 'axios';

const useApi = (url: string, token: string) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      console.log("API URL:", url); // URL'yi kontrol et
      console.log("Token:", token); // Token'ı kontrol et
      let response;
      try {
        response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("API Response:", response); // API yanıtını kontrol et
        setData(response.data);
      } catch (err) {
        console.error("response :", response);
        console.error("API Error:", err); // Hata mesajını logla
        setError(err);
      }
    };
  
    fetchData();
  }, [url, token]);  // Bağımlılıklar: url ve token
  

  return { data, loading, error };
};

export default useApi;
