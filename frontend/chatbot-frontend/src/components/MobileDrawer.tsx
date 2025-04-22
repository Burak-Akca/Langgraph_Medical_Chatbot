import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  IconButton,
  Typography,
  Avatar,
} from "@mui/material";
import {
  Home as HomeIcon,
  Info as InfoIcon,
  AttachMoney as PricingIcon,
  ContactMail as ContactIcon,
  Login as LoginIcon,
  AppRegistration as RegisterIcon,
  Close as CloseIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
  Settings as SettingsIcon,
  Chat as ChatIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
  isAuthenticated: boolean;
  onLogout: () => void;
}

const MobileDrawer: React.FC<MobileDrawerProps> = ({
  open,
  onClose,
  isAuthenticated,
  onLogout,
}) => {
  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 280,
          background: "linear-gradient(180deg, #4158D0 0%, #C850C0 100%)",
          color: "white",
        },
      }}
    >
      <Box
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", textShadow: "1px 1px 2px rgba(0,0,0,0.2)" }}
        >
          ChatBot App
        </Typography>
        <IconButton onClick={onClose} sx={{ color: "white" }}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider sx={{ backgroundColor: "rgba(255,255,255,0.2)" }} />

      {isAuthenticated && (
        <Box sx={{ p: 2, display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar
            alt="User Avatar"
            src="https://placehold.co/40x40"
            sx={{
              width: 50,
              height: 50,
              border: "2px solid white",
              boxShadow: "0 0 10px rgba(255,255,255,0.3)",
            }}
          />
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              User Name
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              user@example.com
            </Typography>
          </Box>
        </Box>
      )}

      <List sx={{ pt: 1 }}>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/" onClick={onClose}>
            <ListItemIcon sx={{ color: "white" }}>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component={Link} to="/about" onClick={onClose}>
            <ListItemIcon sx={{ color: "white" }}>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="About" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component={Link} to="/prices" onClick={onClose}>
            <ListItemIcon sx={{ color: "white" }}>
              <PricingIcon />
            </ListItemIcon>
            <ListItemText primary="Pricing" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component={Link} to="/contact" onClick={onClose}>
            <ListItemIcon sx={{ color: "white" }}>
              <ContactIcon />
            </ListItemIcon>
            <ListItemText primary="Contact" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component={Link} to="/conversation" onClick={onClose}>
            <ListItemIcon sx={{ color: "white" }}>
              <ChatIcon />
            </ListItemIcon>
            <ListItemText primary="Conversation" />
          </ListItemButton>
        </ListItem>
      </List>

      <Divider sx={{ backgroundColor: "rgba(255,255,255,0.2)", my: 1 }} />

      {isAuthenticated ? (
        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/profile" onClick={onClose}>
              <ListItemIcon sx={{ color: "white" }}>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component={Link} to="/settings" onClick={onClose}>
              <ListItemIcon sx={{ color: "white" }}>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                onLogout();
                onClose();
              }}
              sx={{ color: "#FFCC70" }}
            >
              <ListItemIcon sx={{ color: "#FFCC70" }}>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      ) : (
        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/login" onClick={onClose}>
              <ListItemIcon sx={{ color: "white" }}>
                <LoginIcon />
              </ListItemIcon>
              <ListItemText primary="Login" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component={Link} to="/register" onClick={onClose}>
              <ListItemIcon sx={{ color: "white" }}>
                <RegisterIcon />
              </ListItemIcon>
              <ListItemText primary="Register" />
            </ListItemButton>
          </ListItem>
        </List>
      )}
    </Drawer>
  );
};

export default MobileDrawer;
