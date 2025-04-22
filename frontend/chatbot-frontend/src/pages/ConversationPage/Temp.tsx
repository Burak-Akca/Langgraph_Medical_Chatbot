import React, { useState, useCallback, useEffect } from "react";
import { data, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Paper,
  Box,
  IconButton,
  useMediaQuery,
  useTheme,
  Tooltip,
  styled,
} from "@mui/material";
import {
  Menu as MenuIcon,
  MoreVert as MoreVertIcon,
} from "@mui/icons-material";
import axios from "axios";

import NavigationBar from "../../components/NavigationBar";
import ConversationInput from "../../components/ConversationInput";
import ConversationDrawer from "./components/ConversationDrawer";
import MessageList from "./components/MessageList";
import UpgradeMessage from "./components/UpgradeMessage";
import { Message, Conversation } from "./types";
import useApi from "../../api/GetAllConservations"
import getUserIdFromToken from "../../components/getUserIdFromToken";

const drawerWidth = 300;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  width: "100%",
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: 0,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: `${drawerWidth}px`,
  }),
}));

const ConversationPage: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // State
  const [conversations, setConversations] = useState<Conversation[]>([]);

  const [drawerOpen, setDrawerOpen] = useState(!isMobile);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userMessageCount, setUserMessageCount] = useState<number>(0);
  const [showUpgradeMessage, setShowUpgradeMessage] = useState<boolean>(false);
  const [hasPaidAccount, setHasPaidAccount] = useState<boolean>(false); // Mock state, would come from auth context in real app
  const MESSAGE_LIMIT = 5;

  // Sample conversation data
  const ClientId=getUserIdFromToken();
  const token=sessionStorage.getItem("access_token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://localhost:7059/api/Conversations/user/efe3f3c6-a3f9-4488-9d6e-4a6ad12d9520", {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        console.log("API Response:", response); // API response logging
        
        // Check if response data is valid
        if (response.data) {
          setConversations(response); // Set conversations only if data exists
        } else {
          console.error("No conversations data received");
        }
      } catch (err) {
        console.error("API Error:", err); // Handle any error
      }
    };
    fetchData();
  }, [token]); // Add token as a dependency to ensure the effect re-runs when token changes
  

 

  //  [
   //  {
  //     id: 1,
  //     title: "Headache symptoms",
  //     preview: "What could be causing my persistent headache?",
  //     date: new Date(Date.now() - 24 * 60 * 60 * 1000),
  //     starred: true,
  //     messages: [
  //       {
  //         id: 1,
  //         text: "Hello! I'm your medical assistant. How can I help you today?",
  //         sender: "bot",
  //         timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
  //       },
  //       {
  //         id: 2,
  //         text: "What could be causing my persistent headache?",
  //         sender: "user",
  //         timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000 + 1000),
  //       },
  //       {
  //         id: 3,
  //         text: "Persistent headaches cscdsccan have many causes including tension, migraines, dehydration, eye strain, or more serious conditions. How long have you been experiencing this headache and are there any other symptoms?",
  //         sender: "bot",
  //         timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000 + 2000),
  //       },
  //     ],
  //   }
    
  // ]
  












  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);



  React.useEffect(() => {
    if (conversations.length > 0 && !selectedConversation) {
      setSelectedConversation(conversations[0]);
      setMessages(conversations[0].messages);
    } else if (!selectedConversation) {
      // If no conversations, show welcome message
      setMessages([
        {
          id: 1,
          text: "Hello! I'mcd d dd yourhjnkml medical assistant. How can I help you today?",
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
    }
  }, [conversations]);






  // Navigate to prices page
  const navigateToPrices = useCallback(() => {
    navigate("/prices");
  }, [navigate]);






  // Handle drawer toggle
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };




  // Handle conversation selection
  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    setMessages(conversation.messages);
    if (isMobile) {
      setDrawerOpen(false);
    }
  };

  // Handle starring a conversation
    const handleToggleStar = (id: number, event: React.MouseEvent) => {
        event.stopPropagation();
        setConversations((prevConversations) =>
        prevConversations.map((conv) =>
            conv.id === id ? { ...conv, starred: !conv.starred } : conv,
        ),
        );
    };



  // Start a new conversation
  const  handleNewConversation =  () => {

    const newConversation = {
      id: conversations.length + 1,
      title: "xNew Conversation",
      preview: "",
      date: new Date(),
      starred: false,
      messages: [
        {
          id: 1,
          text: "Hello! burak?",
          sender: "bot",
          timestamp: new Date(),
        },
      ],
    };
    setConversations([newConversation,...conversations]);

    setMessages([
      {
        id: 1,
        text: "Hello! I'm youöç.r medical assistant. How can I help you today?",
        sender: "bot",
        timestamp: new Date(),
      },
      {
        id: 2,
        text: "Hello! I'm youöç.r medical assistant. How can I help you today?",
        sender: "bot",
        timestamp: new Date(),
      },
    ]
  
  );        
  setSelectedConversation(newConversation); // 🔥 burada doğrudan seçiyoruz

    if (isMobile) {
      setDrawerOpen(false);
    }
  };















  const handleSendMessage = async (messageText: string) => {


    // Check if user has reached message limit
    if (!hasPaidAccount && userMessageCount >= MESSAGE_LIMIT) {
      return;
    }

    // Add user message to the conversation
    const userMessage: Message = {
      id: messages.length + 1,
      text: messageText,
      sender: "user",
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setIsLoading(true);//////////////////////////////////////////////////////////

    // Increment user message count
    const newCount = userMessageCount + 1;
    setUserMessageCount(newCount);

    try {
      // Send the message to the backend API
      const response = await axios.post<{ answer: string }>(
        "http://localhost:8000/rag",
        {
          question: messageText,
        },
      );

      // Check if this was the last allowed message
      let botResponseText = response.data.answer;

      if (!hasPaidAccount && newCount >= MESSAGE_LIMIT) {
        // Add upgrade message and show it immediately
        setShowUpgradeMessage(true);

        // Add a clear notification in the bot's response
        botResponseText = `${response.data.answer}\n\nYou've reached the limit of ${MESSAGE_LIMIT} messages in your free trial. To continue chatting, please upgrade to a premium plan.`;

        // Set a timeout to show a dialog or automatically redirect after a delay
        setTimeout(() => {
          if (
            window.confirm(
              "You've reached your free message limit. Would you like to view our pricing plans?",
            )
          ) {
            navigateToPrices();
          }
        }, 2000);
      }

      // Add bot response to the conversation
      const botMessage: Message = {
        id: updatedMessages.length + 1,
        text: botResponseText,
        sender: "bot",
        timestamp: new Date(),
      };

      const finalMessages = [...updatedMessages, botMessage];
      setMessages(finalMessages);

      // If this is a new conversation, create it and add to the list
      if (!selectedConversation) {
        const newConversation: Conversation = {
          id: conversations.length + 1,
          title:
            messageText.length > 30
              ? messageText.substring(0, 30) + "..."
              : messageText,
          preview: messageText,
          date: new Date(),
          messages: finalMessages,
          starred: false,
        };
        setConversations([newConversation, ...conversations]);
        setSelectedConversation(newConversation);
      } else {
        // Update the existing conversation
        const updatedConversations = conversations.map((conv) =>
          conv.id === selectedConversation.id
            ? {
                ...conv,
                messages: finalMessages,
                preview: messageText,
                date: new Date(),
              }
            : conv,
        );
        setConversations(updatedConversations);
        setSelectedConversation({
          ...selectedConversation,
          messages: finalMessages,
          preview: messageText,
          date: new Date(),
        });
      }
    } catch (error) {
      console.error("Error sending message:", error);

      // Add error message
      const errorMessage: Message = {
        id: updatedMessages.length + 1,
        text: "I'm sorry, I couldn't process your request. Please try again later.",
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages([...updatedMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <NavigationBar />
      <Box sx={{ display: "flex" }}>
        {/* Conversation History Drawer */}
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
        <Main open={drawerOpen && !isMobile}>
          <Container
            maxWidth={false}
            sx={{ mt: 2, mb: 2, pl: { xs: 2, sm: 3 }, pr: { xs: 2, sm: 3 } }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              {isMobile && (
                <IconButton
                  color="primary"
                  aria-label="open drawer"
                  onClick={handleDrawerToggle}
                  sx={{ mr: 2, display: { sm: "block", md: "none" } }}
                >
                  <MenuIcon />
                </IconButton>
              )}
              <Typography variant="h5" component="h1">
                {selectedConversation
                  ? selectedConversation.title
                  : "New Conversation"}
              </Typography>
              {selectedConversation && (
                <Tooltip title="More options">
                  <IconButton>
                    <MoreVertIcon />
                  </IconButton>
                </Tooltip>
              )}
            </Box>

            <Paper
              elevation={20}
              sx={{
                p: { xs: 2, sm: 3 },
                borderRadius: 2,
                height: "calc(100vh - 140px)",
                display: "flex",
                flexDirection: "column",
                maxWidth: "100%",
                mr:"50px"
              }}
            >
              <MessageList messages={messages} isLoading={isLoading} />

              {showUpgradeMessage && (
                <UpgradeMessage onUpgradeClick={navigateToPrices} />
              )}

              <ConversationInput
                onSendMessage={handleSendMessage}
                disabled={!hasPaidAccount && userMessageCount >= MESSAGE_LIMIT}
                remainingMessages={
                  !hasPaidAccount && userMessageCount < MESSAGE_LIMIT
                    ? MESSAGE_LIMIT - userMessageCount
                    : undefined
                }
              />
            </Paper>
          </Container>
        </Main>
      </Box>
    </div>
  );
};

export default ConversationPage;
