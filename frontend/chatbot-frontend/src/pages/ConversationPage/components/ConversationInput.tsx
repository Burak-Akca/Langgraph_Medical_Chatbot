import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  IconButton,
  Paper,
  Typography,
  Tooltip,
} from "@mui/material";
import { Send as SendIcon } from "@mui/icons-material";

interface ConversationInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

const ConversationInput: React.FC<ConversationInputProps> = ({
  onSendMessage,
  disabled = false,
  placeholder = "Type your message here...",
}) => {
  const [message, setMessage] = useState("");
  const [greeting, setGreeting] = useState("What is up!");
  const [isWaving, setIsWaving] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleWave = () => {
    setIsWaving(true);
    setTimeout(() => setIsWaving(false), 1000);
  };

  return (
    <Box sx={{ p: 2 }}>
      {/* Greeting with waving hand */}
      <Paper
        elevation={0}
        sx={{
          p: 2,
          mb: 2,
          display: "flex",
          alignItems: "center",
          bgcolor: "background.default",
          borderRadius: 2,
        }}
      >
        <Typography variant="body1" sx={{ mr: 2 }}>
          {greeting}
        </Typography>
        <Box
          component="span"
          onClick={handleWave}
          sx={{
            cursor: "pointer",
            fontSize: "1.5rem",
            display: "inline-block",
            transform: isWaving ? "rotate(20deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease-in-out",
          }}
        >
          👋
        </Box>
        <Typography variant="body2" sx={{ ml: 2, color: "text.secondary" }}>
          Click the hand to wave back!
        </Typography>
      </Paper>

      {/* Message input form */}
      <Paper
        component="form"
        onSubmit={handleSubmit}
        elevation={1}
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          borderRadius: 4,
        }}
      >
        <TextField
          fullWidth
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 4,
              "& fieldset": {
                border: "none",
              },
            },
          }}
        />
        <Tooltip title="Send message">
          <span>
            <IconButton
              type="submit"
              color="primary"
              disabled={!message.trim() || disabled}
              sx={{ p: "10px" }}
            >
              <SendIcon />
            </IconButton>
          </span>
        </Tooltip>
      </Paper>
    </Box>
  );
};

export default ConversationInput;
