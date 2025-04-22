import React, { useRef, useEffect } from "react";
import {
  Box,
  CircularProgress,
  Typography,
  Paper,
  Avatar,
} from "@mui/material";
import MessageItem from "./MessageItem";
import { Message } from "../types";

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
}

const MessageList: React.FC<MessageListProps> = ({ messages, isLoading }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Box
      sx={{
        flexGrow: 1,
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        p: 1,
      }}
    >
      {messages.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}

      {isLoading && (
        <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar sx={{ bgcolor: "secondary.main", width: 40, height: 40 }}>
              B
            </Avatar>
            <Paper
              elevation={1}
              sx={{ p: 2, borderRadius: 2, bgcolor: "grey.100" }}
            >
              <CircularProgress size={20} thickness={4} sx={{ mr: 1 }} />
              <Typography variant="body2" component="span">
                Thinking...
              </Typography>
            </Paper>
          </Box>
        </Box>
      )}

      <div ref={messagesEndRef} />
    </Box>
  );
};

export default MessageList;
