import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Avatar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { LogoutOutlined } from "@mui/icons-material";
import {useUserImage} from "../Context/UserImageContext";

interface LogoutConfirmationProps {
  open: boolean;
  onClose: () => void;
}

const LogoutConfirmation: React.FC<LogoutConfirmationProps> = ({
  open,
  onClose,
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const navigate = useNavigate();
  const { imageUrl,setImageUrl } = useUserImage();

  const handleLogout = () => {
    setImageUrl(null);
    sessionStorage.removeItem("access_token");
    navigate("/signin");
  };

  const handleReturnToDashboard = () => {
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: 2,
          maxWidth: "400px",
          width: "100%",
          p: 2,
        },
      }}
    >
      <DialogContent sx={{ textAlign: "center", pb: 2 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Avatar
            sx={{
              width: 80,
              height: 80,
              bgcolor: "error.light",
              mb: 2,
            }}
          >
            <LogoutOutlined sx={{ fontSize: 40 }} />
          </Avatar>

          <Typography
            variant="h5"
            component="div"
            fontWeight="bold"
            gutterBottom
          >
            Ready to Leave?
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: "320px" }}
          >
            Thank you for using our application. You will be securely logged out
            of your account.
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions
        sx={{
          display: "flex",
          flexDirection: "column", // Butonları alt alta hizalar
          gap: 1, // Butonlar arasına boşluk ekler
          p: 0,
          pt: 0,
        }}
      >
        <Button
          variant="contained"
          fullWidth
          color="primary"
          onClick={handleLogout}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          sx={{
            py: 1.5,
            bgcolor: isHovering ? "#1a1a1a" : "#2563eb",
            transform: isHovering ? "translateY(-2px)" : "none",
            transition: "all 0.2s ease-in-out",
            "&:hover": {
              bgcolor: "#1a1a1a",
            },
          }}
        >
          Confirm Logout
        </Button>

        <Button className="belali"
          variant="outlined"
          
          onClick={handleReturnToDashboard}
          sx={{
            py: 1.5,
            ml: 0,
          
          }}
        >Cancel   </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LogoutConfirmation;
