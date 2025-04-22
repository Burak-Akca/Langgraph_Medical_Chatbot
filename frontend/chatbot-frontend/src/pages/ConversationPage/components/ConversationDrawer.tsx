import React from "react";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  useMediaQuery,
  useTheme,
  styled,
} from "@mui/material";
import { ChevronLeft as ChevronLeftIcon } from "@mui/icons-material";
import ConversationList from "./ConversationList";
import { Conversation } from "../types";

interface ConversationDrawerProps {
  drawerOpen: boolean;
  handleDrawerToggle: () => void;
  conversations: Conversation[];
  selectedConversation: Conversation | null;
  onSelectConversation: (conversation: Conversation) => void;
  onToggleStar: (id: number, event: React.MouseEvent) => void;
  onNewConversation: () => void;
}

const drawerWidth = 300;

const DrawerHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "space-between",
  borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
}));

const ConversationDrawer: React.FC<ConversationDrawerProps> = ({
  drawerOpen,
  handleDrawerToggle,
  conversations,
  selectedConversation,
  onSelectConversation,
  onToggleStar,
  onNewConversation,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Drawer
      variant={isMobile ? "temporary" : "persistent"}
      open={drawerOpen}
      onClose={isMobile ? handleDrawerToggle : undefined}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          borderRight: "1px solid rgba(0, 0, 0, 0.12)",
          marginTop: "64px", // Adjust based on your navbar height
          height: "calc(100% - 64px)",
        },
      }}
    >
      <DrawerHeader>
        <Typography variant="h6" sx={{ fontWeight: 600, pl: 1 }}>
          Conversation History
        </Typography>
        {isMobile && (
          <IconButton onClick={handleDrawerToggle}>
            <ChevronLeftIcon />
          </IconButton>
        )}
      </DrawerHeader>

      <ConversationList
        conversations={conversations}
        selectedConversation={selectedConversation}
        onSelectConversation={onSelectConversation}
        onToggleStar={onToggleStar}
        onNewConversation={onNewConversation}
      />
    </Drawer>
  );
};

export default ConversationDrawer;
