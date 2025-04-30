import React, { useState, KeyboardEvent } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

interface ConversationInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  remainingMessages?: number;
}

const ConversationInput: React.FC<ConversationInputProps> = ({
  onSendMessage,
  disabled = false,
  remainingMessages,
}) => {
  const [userInput, setUserInput] = useState<string>("");

  const handleSendMessage = () => {
    if (userInput .trim() && !disabled) {
      onSendMessage(userInput);
      setUserInput("");
    }
  };

  const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !disabled) {
      handleSendMessage();
    }
  };

  return (
    <Box sx={{ width: "100%", mt: 2 }}>
      {remainingMessages !== undefined && remainingMessages > 0 && (
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: "block", mb: 1, textAlign: "right" }}
        >
          {remainingMessages} message{remainingMessages !== 1 ? "s" : ""}{" "}
          remaining in free trial
        </Typography>
      )}

      <Box
        sx={{ display: "flex", alignItems: "center", gap: 1, width: "100%" }}
      >
        <TextField
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyUp={handleKeyUp}
          fullWidth
          placeholder={
            disabled
              ? "Upgrade to continue chatting"
              : "Type your medical question..."
          }
          variant="outlined"
          size="medium"
          disabled={disabled}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
              ...(disabled && {
                borderColor: "primary.main",
                bgcolor: "rgba(0, 0, 0, 0.04)",
              }),
            },
            ...(disabled && {
              "& .Mui-disabled": {
                WebkitTextFillColor: "rgba(0, 0, 0, 0.6) !important",
              },
            }),
          }}
        />
        <Button
          variant="contained"
          color="primary"
          endIcon={<SendIcon />}
          onClick={handleSendMessage}
          disabled={disabled || !userInput.trim()}
          sx={{ height: "56px", borderRadius: "8px" }}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default ConversationInput;
