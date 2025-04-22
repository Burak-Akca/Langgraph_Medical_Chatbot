import React from "react";
import { Box, Avatar, Paper, Typography } from "@mui/material";
import { Message } from "../types";

interface MessageItemProps {
  message: Message;
}

const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: message.sender === "user" ? "flex-end" : "flex-start",
        mb: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          maxWidth: "70%",
          gap: 1,
          flexDirection: message.sender === "user" ? "row-reverse" : "row",
        }}
      >
        <Avatar
          sx={{
            bgcolor:
              message.sender === "user" ? "primary.main" : "secondary.main",
            width: 40,
            height: 40,
          }}
        >
          {message.sender === "user" ? "U" : "B"}
        </Avatar>
        <Paper
        
          elevation={1}
          sx={{
            p: 2,
            borderRadius: 2,
            bgcolor: message.sender === "user" ? "primary.light" : "grey.100",
            color: message.sender === "user" ? "white" : "text.primary",
          }}
        >
          <Typography variant="body1">{message.messageText}</Typography>
          <Typography
            variant="caption"
            sx={{
              display: "block",
              mt: 1,
              textAlign: message.sender === "user" ? "right" : "left",
              opacity: 0.7,
            }}
          >
            {new Date(message.timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default MessageItem;
