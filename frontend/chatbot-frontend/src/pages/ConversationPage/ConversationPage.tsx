import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  IconButton,
  Typography,
  Paper,
  Divider,
  Alert,
  Snackbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {  
  Menu as MenuIcon,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";
import ConversationDrawer from "./components/ConversationDrawer";
import MessageList from "./components/MessageList";
import ConversationInput from "./components/ConversationInput";
import UpgradeMessage from "./components/UpgradeMessage";
import { PostConversation, useConversations } from "./hooks/useConversations";
import { Conversation, Message } from "./types";
import getUserIdFromToken from "../../components/getUserIdFromToken";
import NavigationBar from "../../components/NavigationBar";
import { GetMessages, PostMessages } from "./hooks/useMessages";
import axios from "axios";

const ConversationPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // State for drawer
  const [drawerOpen, setDrawerOpen] = useState(!isMobile);

  // State for conversations
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isMessageLoading, setIsMessageLoading] = useState(false);
  const [showUpgradeMessage, setShowUpgradeMessage] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [conversationId, setConversationId] = useState<number>(0);

  // Get token from localStorage
  const token = sessionStorage.getItem("access_token");
  const userId = getUserIdFromToken();

  // Use our custom hook to fetch conversations
  
  const {
    loading: conversationsLoading,
    error: conversationsError,
    refetch,
  } = useConversations({
    apiUrl: `https://localhost:7059/api/Conversations/user/${userId}`,
    token: token ,
    conversations,
    setConversations
  });
  useEffect(() => {
    if (conversations.length > 0 && !selectedConversation) {
      const lastConversation = conversations.reduce((latest, current) => {
        const latestDate = new Date(latest.startedAt).getTime();
        const currentDate = new Date(current.startedAt).getTime();
        return currentDate > latestDate ? current : latest;
      });
  
      // async fonksiyonu hemen çalışan bir fonksiyon ile çağırıyoruz
      (async () => {
        try {
          await handleSelectConversation(lastConversation);
        } catch (error) {
          console.error("Error selecting the last conversation:", error);
        }
      })();
    }
  }, [conversations, selectedConversation]);
  

  // Handle drawer toggle
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  // Handle starring a conversation
  const handleToggleStar = (id: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setConversations((prevConversations) =>
      prevConversations.map((conv) =>
        conv.id === id ? { ...conv, starred: !conv.starred } : conv
      )
    );
  };

  // Handle selecting a conversation
  const handleSelectConversation = async(conversation: Conversation) => {
try{
    // eslint-disable-next-line no-debugger
    debugger
    const id = conversation.id;
    console.log("Selected conversation ID:", id);
    // Clear existing messages before loading new ones
    setMessages([]);
     await GetMessages({
      apiUrl: `https://localhost:7059/api/Messages/Conversation/${id}`,
      token: token ,
      setmessages: setMessages
    });
    console.log(conversation.id);
    setSelectedConversation(conversation);
    if (isMobile) {
      setDrawerOpen(false);
    }
  } catch{
    console.log("error");
  }
  };


  // Handle creating a new conversation
  const handleNewConversation = async() => {


    try{
    // eslint-disable-next-line no-debugger
    debugger
    setConversationId(conversationId + 1);
   
    const newConversation: Conversation = {
      id: conversationId.toString(),
      title: "New Conversation",
      startedAt: new Date(),
      status: "active",
      starred: false,
      userId: userId || ""
    };

    const finalConversation = await PostConversation({
      apiUrl: `https://localhost:7059/api/Conversations`,
      newConversation,
      token: token ,
      conversations,
      setConversations
    });
    // Select the new conversation immediately
    if (finalConversation) {
      handleSelectConversation(finalConversation);
      if (isMobile) {
        setDrawerOpen(false);
      }
    }
    
  } catch{
    console.log("error");
  }
  };

  // Handle sending a message
  
  const handleSendMessage = async (text: string) => {
try{
    
    const localToken = token;
    // eslint-disable-next-line no-debugger
    debugger
    if (!selectedConversation) return;

    const id = selectedConversation.id;
    // Create a new message
    const newMessage: Message = {
      id: "blank",
      conversationId: id,
      messageText: text,
      sender: "user",
      timestamp: new Date().toISOString(),
    };

    // Add user message immediately to the UI

    
    // Post message to backend
    await PostMessages({
      apiUrl: "https://localhost:7059/api/Messages",
      Newmessage: newMessage,
      token: localToken,
      messages,
      setmessages: setMessages
    });




    if (selectedConversation.title === "New Conversation") {
      const updatedConversation = {
        ...selectedConversation,
        title: text,
      };
  
      setSelectedConversation(updatedConversation);
  
      const updatedList = conversations.map(convo =>
        convo.id === id
          ? { ...convo, title: text }
          : convo
      );
      setConversations(updatedList);
  
      // (İsteğe bağlı) Backend'e de PUT yap
      try {
        await axios.put(`https://localhost:7059/api/Conversations/`, {
          id: selectedConversation.id,
          userId: selectedConversation.userId,
          title: text, 
          startedAt: selectedConversation.startedAt,
          status: selectedConversation.status
        }, {
          headers: {
            Authorization: `Bearer ${localToken}`,
          },
        });
      } catch (error) {
        console.error("Başlık backend'e güncellenemedi:", error);
      }
    }


    // Simulate bot response
    setIsMessageLoading(true);

    // Count only user messages for the limit check
    const userMessageCount = messages.filter(msg => msg.sender === "user").length;
    
    // Check if user has reached message limit (for demo purposes)
    if (userMessageCount >= 4) {
      setTimeout(() => {
        setIsMessageLoading(false);
        setShowUpgradeMessage(true);
      }, 1500);
      return;
    }

    // Simulate API call for bot response
   setTimeout(async () => {
// eslint-disable-next-line no-debugger
debugger
try{
      const response = await axios.post("https://medical-chatbot-backend-1014200023198.us-central1.run.app/rag", {
        question: text
      })
        // eslint-disable-next-line no-debugger
        debugger
        console.log(response.data);
        const botResponse: Message = {
          id: "blank",
          conversationId: id,
          messageText: response.data.answer || "No answer found",
          sender: "bot",
          timestamp: new Date().toISOString(),
        };
      
  // Post bot response to backend
    await PostMessages({
    apiUrl: "https://localhost:7059/api/Messages",
    Newmessage: botResponse,  
    token: localToken,
    messages,
    setmessages: setMessages
  });

      
    
      setIsMessageLoading(false);
    } catch{

console.log("Error fetching bot response:", error);

    } }, 2000);
  } catch{
    console.log("error");
  }
  };

  // Handle upgrading account
  const handleUpgrade = () => {
    window.location.href = "/prices";
  };

  // Handle error snackbar close
  const handleCloseError = () => {
    setError(null);
  };

  // Show error from API if any
  useEffect(() => {
    if (conversationsError) {
      setError("Failed to load conversations. Please try again later.");
    }
  }, [conversationsError]);

  return (
    <div>
      <NavigationBar />
      <Box sx={{ display: "flex", height: "calc(100vh - 64px)" }}>
        {/* Conversation Drawer */}
        <ConversationDrawer
          drawerOpen={drawerOpen}
          handleDrawerToggle={handleDrawerToggle}
          conversations={conversations}
          selectedConversation={selectedConversation}
          onSelectConversation={handleSelectConversation}
          onToggleStar={handleToggleStar}
          onNewConversation={handleNewConversation}
        />

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            height: "100%",
            overflow: "hidden",
          }}
        >
          {/* Mobile Header */}
          {isMobile && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                p: 1,
                borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
              }}
            >
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2 }}
              >
                {drawerOpen ? <ArrowBackIcon /> : <MenuIcon />}
              </IconButton>
              <Typography variant="h6" noWrap component="div">
                {selectedConversation?.title || "Conversation"}
              </Typography>
            </Box>
          )}

          {/* Conversation Content */}
          {conversationsLoading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Typography>Loading conversations...</Typography>
            </Box>
          ) : selectedConversation ? (
            <>
              {/* Message List */}
              <Box
                sx={{
                  flexGrow: 1,
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <MessageList
                  messages={messages}
                  isLoading={isMessageLoading}
                />
              </Box>

              {/* Upgrade Message (if shown) */}
              {showUpgradeMessage && (
                <Box sx={{ px: 2 }}>
                  <UpgradeMessage onUpgradeClick={handleUpgrade} />
                </Box>
              )}

              {/* Input Area */}
              <Divider />
              <ConversationInput
                onSendMessage={handleSendMessage}
                disabled={showUpgradeMessage || isMessageLoading}
              />
            </>
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                p: 3,
              }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  textAlign: "center",
                  maxWidth: "500px",
                  bgcolor: "background.default",
                }}
              >
                <Typography variant="h5" gutterBottom>
                  No Conversation Selected
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  Select a conversation from the sidebar or start a new one.
                </Typography>
              </Paper>
            </Box>
          )}
        </Box>

        {/* Error Snackbar */}
        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          onClose={handleCloseError}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert onClose={handleCloseError} severity="error">
            {error}
          </Alert>
        </Snackbar>
      </Box>
    </div>
  );
};

export default ConversationPage;
