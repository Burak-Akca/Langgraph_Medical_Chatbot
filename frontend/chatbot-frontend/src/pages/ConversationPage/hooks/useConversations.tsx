import { useState, useEffect } from "react";
import axios from "axios";
import { Conversation } from "../types";

interface UseConversationsProps {
  apiUrl: string;
  token: string;
  setConversations: (value: Conversation[]) => void;
}

interface PostConversationProps {
  apiUrl: string;
  newConversation:Conversation;
  token: string;  
  conversations: Conversation[];
  setConversations: (value: Conversation[]) => void;
}

export const useConversations = ({
  apiUrl,
  token,
  conversations,

setConversations,
}: UseConversationsProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchConversations = async () => {
    setLoading(true);
    try {
      console.log("Fetching conversations from:", apiUrl);
      console.log("Using token:", token);

      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log("API Response:", response);

      // Transform the API response to match our Conversation type
      // This assumes the API returns data in a format that can be mapped to our Conversation type
      // Adjust the transformation logic based on the actual API response structure
      // const transformedData: Conversation[] = response.data.map(
      //   (item: any) => ({
      //     id: "",
      //     userId: item.userId,
      //     title: item.title || "Untitled Conversation",
      //     startedAt: item.startedAt,
      //     status: item.status ,
      //     starred: item.starred || false,
      //   }),
      // );

      setConversations(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching conversations:", err);
      setError(
        err instanceof Error ? err : new Error("An unknown error occurred"),
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, [apiUrl, token]);

  const refetch = async () => {
    await fetchConversations();
  };

  return {loading, error, refetch };
};



export const PostConversation = async ({
  apiUrl,
  newConversation,
  token,
  conversations,
  setConversations,
}: PostConversationProps) => {
  try { 
    const response = await axios.post(apiUrl, newConversation,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Eğer yanıt başarılıysa, state güncellenir
    if (response.status === 200) {

      const finalConversation:Conversation = response.data
      
    
      setConversations([finalConversation,...conversations]);   
    return finalConversation;  }
  } catch (error) {
    console.error("Error posting conversation:", error);
    // Hata yönetimi yapılabilir
  }
};
