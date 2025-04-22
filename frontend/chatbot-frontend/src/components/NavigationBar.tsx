import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Avatar,
  useTheme,
  useMediaQuery,
  alpha,
  Divider,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Login as LoginIcon,
  AppRegistration as RegisterIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import UserMenu from "./UserMenu";
import MobileDrawer from "./MobileDrawer";
import LogoutConfirmation from "./LogoutConfirmation";

interface NavigationBarProps {
  // Add any props if needed
}

const NavigationBar: React.FC<NavigationBarProps> = () => {
  // This would typically come from your auth context or state management
  const isAuthenticated = true; // For demonstration purposes

  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleLogout = () => {
    setShowLogoutDialog(true);
  };

  const handleCloseLogoutDialog = () => {
    setShowLogoutDialog(false);
  };

  return (
    <>
      <AppBar
        position="static"
        elevation={3}
        sx={{
          background:
            "linear-gradient(90deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {isMobile && (
              <IconButton
                edge="start"
                sx={{
                  color: "white",
                  mr: 2,
                  "&:hover": {
                    backgroundColor: alpha("#ffffff", 0.2),
                  },
                }}
                aria-label="menu"
                onClick={toggleDrawer}
              >
                <MenuIcon />
              </IconButton>
            )}

            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                textDecoration: "none",
                color: "white",
                fontWeight: "bold",
                textShadow: "1px 1px 2px rgba(0,0,0,0.2)",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                },
              }}
            >
              ChatBot App
            </Typography>
          </Box>

          {!isMobile && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                marginLeft: "auto",
                mr: 2,
              }}
            >
              <Button
                component={Link}
                to="/"
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    width: "0",
                    height: "2px",
                    bottom: 0,
                    left: "50%",
                    backgroundColor: "#FFCC70",
                    transition: "all 0.3s ease",
                  },
                  "&:hover::after": {
                    width: "100%",
                    left: "0",
                  },
                }}
              >
                Home
              </Button>
              <Button
                component={Link}
                to="/about"
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    width: "0",
                    height: "2px",
                    bottom: 0,
                    left: "50%",
                    backgroundColor: "#C850C0",
                    transition: "all 0.3s ease",
                  },
                  "&:hover::after": {
                    width: "100%",
                    left: "0",
                  },
                }}
              >
                About
              </Button>
              <Button
                component={Link}
                to="/prices"
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    width: "0",
                    height: "2px",
                    bottom: 0,
                    left: "50%",
                    backgroundColor: "#4158D0",
                    transition: "all 0.3s ease",
                  },
                  "&:hover::after": {
                    width: "100%",
                    left: "0",
                  },
                }}
              >
                Pricing
              </Button>
              <Button
                component={Link}
                to="/contact"
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    width: "0",
                    height: "2px",
                    bottom: 0,
                    left: "50%",
                    backgroundColor: "#FFCC70",
                    transition: "all 0.3s ease",
                  },
                  "&:hover::after": {
                    width: "100%",
                    left: "0",
                  },
                }}
              >
                Contact
              </Button>
              <Button
                component={Link}
                to="/conversation"
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    width: "0",
                    height: "2px",
                    bottom: 0,
                    left: "50%",
                    backgroundColor: "#C850C0",
                    transition: "all 0.3s ease",
                  },
                  "&:hover::after": {
                    width: "100%",
                    left: "0",
                  },
                }}
              >
                Conversation
              </Button>
            </Box>
          )}

          <Box sx={{ display: "flex", alignItems: "center" }}>
            {!isMobile && !isAuthenticated ? (
              <>
                <Button
                  component={Link}
                  to="/login"
                  startIcon={<LoginIcon />}
                  sx={{
                    color: "white",
                    mr: 1,
                    fontWeight: "bold",
                    "&:hover": {
                      backgroundColor: alpha("#ffffff", 0.1),
                    },
                  }}
                >
                  Login
                </Button>
                <Button
                  component={Link}
                  to="/register"
                  variant="outlined"
                  startIcon={<RegisterIcon />}
                  sx={{
                    color: "white",
                    borderColor: "white",
                    fontWeight: "bold",
                    "&:hover": {
                      borderColor: "#FFCC70",
                      backgroundColor: alpha("#FFCC70", 0.1),
                    },
                  }}
                >
                  Register
                </Button>
              </>
            ) : (
              !isMobile && (
                <IconButton
                  onClick={handleUserMenuOpen}
                  sx={{
                    ml: 2,
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.1)",
                    },
                  }}
                >
                  <Avatar
                    alt="User Avatar"
                    src="https://placehold.co/40x40"
                    sx={{
                      width: 40,
                      height: 40,
                      border: "2px solid white",
                      boxShadow: "0 0 10px rgba(255,255,255,0.5)",
                      "&:hover": {
                        border: "2px solid #FFCC70",
                        boxShadow: "0 0 15px rgba(255,204,112,0.7)",
                      },
                    }}
                  />
                </IconButton>
              )
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <MobileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
      />

      <UserMenu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        handleClose={handleUserMenuClose}
      />

      <LogoutConfirmation
        open={showLogoutDialog}
        onClose={handleCloseLogoutDialog}
      />
    </>
  );
};

export default NavigationBar;
