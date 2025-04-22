import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";

const WaveGreeting: React.FC = () => {
  const [greeting] = useState("What is up!");
  const [isWaving, setIsWaving] = useState(false);

  const wave = () => {
    setIsWaving(true);
    setTimeout(() => setIsWaving(false), 1000);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 2,
        mb: 2,
        borderRadius: 2,
        bgcolor: "background.paper",
        boxShadow: 1,
      }}
    >
      <Typography variant="h5" gutterBottom>
        {greeting}
      </Typography>
      <Box
        onClick={wave}
        sx={{
          fontSize: "2rem",
          cursor: "pointer",
          transform: isWaving ? "rotate(20deg)" : "rotate(0deg)",
          transition: "transform 0.2s ease-in-out",
          mb: 1,
        }}
      >
        <Typography variant="h3">👋</Typography>
      </Box>
      <Typography variant="body2" color="text.secondary">
        Click the hand to wave!
      </Typography>
    </Box>
  );
};

export default WaveGreeting;
