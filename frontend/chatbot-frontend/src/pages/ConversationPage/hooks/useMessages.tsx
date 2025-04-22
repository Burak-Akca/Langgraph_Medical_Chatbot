import axios from "axios";
import { useEffect } from "react";
import { Message } from "../types";

interface GetMessagesProps {
  apiUrl: string;
  token: string;
  conversationId: string;
  setmessages:  (value: Message[]) => void;
}


interface PostMessagesProps {
  apiUrl: string;
  token: string;
  Newmessage:Message;
  messages: Message[];
  setmessages:  (value: Message[]) => void;
}

export const PostMessages = async ({
  apiUrl,
  Newmessage,
  token,
  
  messages,
  setmessages
}: PostMessagesProps) => {
  try {


    console.log("Newmessage value:", Newmessage);
console.log("token value:", token);
    const response = await axios.post(apiUrl, Newmessage, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Eğer yanıt başarılıysa, state güncellenir
    if (response.status === 200) {
      console.log("Message posted successfully:", response.data);
      setmessages(prev => [...prev, Newmessage]);    }
  } catch (error) {
    console.error("Error posting conversation:", error);
    // Hata yönetimi yapılabilir
  }
};











export const GetMessages = async ({
    apiUrl,
    token,
    setmessages
  }: GetMessagesProps) => {
    try {
      const response = await axios.get(apiUrl   ,{
        headers: {
            Authorization: `Bearer ${token}`,
        },
      });
  
      // Eğer yanıt başarılıysa, state güncellenir
      if (response.status === 200) {
        console.log("Messages fetched successfully:", response.data);
        setmessages(response.data);
        
          }

 
    } catch (error) {
      console.error("Error posting conversation:", error);
      // Hata yönetimi yapılabilir
      setmessages([]);

    }
  };
  