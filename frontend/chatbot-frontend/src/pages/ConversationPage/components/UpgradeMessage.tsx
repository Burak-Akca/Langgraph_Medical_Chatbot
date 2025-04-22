import React, { useEffect } from "react";
import { Box, Typography, Button, Paper, Fade } from "@mui/material";
import { ArrowForward as ArrowForwardIcon } from "@mui/icons-material";

interface UpgradeMessageProps {
  onUpgradeClick: () => void;
}

const UpgradeMessage: React.FC<UpgradeMessageProps> = ({ onUpgradeClick }) => {
  // Add animation effect when component mounts
  useEffect(() => {
    const element = document.getElementById("upgrade-message-box");
    if (element) {
      element.classList.add("pulse-animation");
    }
  }, []);

  return (
    <Fade in={true} timeout={500}>
      <Paper
        elevation={4}
        id="upgrade-message-box"
        sx={{
          p: 3,
          mb: 2,
          borderRadius: 2,
          bgcolor: "primary.light",
          color: "white",
          textAlign: "center",
          border: "2px solid white",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
          position: "relative",
          overflow: "hidden",
          "&.pulse-animation": {
            animation: "pulse 2s infinite",
          },
          "@keyframes pulse": {
            "0%": {
              boxShadow: "0 0 0 0 rgba(255, 255, 255, 0.7)",
            },
            "70%": {
              boxShadow: "0 0 0 10px rgba(255, 255, 255, 0)",
            },
            "100%": {
              boxShadow: "0 0 0 0 rgba(255, 255, 255, 0)",
            },
          },
        }}
      >
        <Typography variant="h5" gutterBottom fontWeight="bold">
          Message Limit Reached!
        </Typography>
        <Typography variant="body1" paragraph>
          You've used all 5 messages in your free trial. To continue chatting
          with our medical assistant, please upgrade to one of our premium
          plans.
        </Typography>
        <Button
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          onClick={onUpgradeClick}
          size="large"
          sx={{
            fontWeight: "bold",
            px: 4,
            py: 1.5,
            bgcolor: "white",
            color: "primary.main",
            "&:hover": {
              bgcolor: "rgba(255, 255, 255, 0.9)",
              transform: "translateY(-2px)",
              boxShadow: "0 6px 20px rgba(0, 0, 0, 0.2)",
            },
            transition: "all 0.3s ease",
          }}
        >
          View Pricing Plans
        </Button>
      </Paper>
    </Fade>
  );
};

export default UpgradeMessage;
