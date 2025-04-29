import React from "react";
import {
  List,
  Box,
  ListItemButton,
  ListItemText,
  Divider,
} from "@mui/material";
import ConversationItem from "./ConversationItem";
import { Conversation } from "../types";

interface ConversationListProps {
  conversations: Conversation[];
  selectedConversation: Conversation | null;
  onSelectConversation: (conversation: Conversation) => void;
  onToggleStar: (id: number, event: React.MouseEvent) => void;
  onNewConversation: () => void;
  onDelete: (id: string) => void;
}

const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  selectedConversation,
  onSelectConversation,
  onToggleStar,
  onNewConversation,
  onDelete,
}) => {
  return (
    <>
      <Box sx={{ p: 2 }}>
        <ListItemButton
          onClick={onNewConversation}
          sx={{
            borderRadius: "8px",
            bgcolor: "primary.main",
            color: "white",
            "&:hover": {
              bgcolor: "primary.dark",
            },
          }}
        >
          <ListItemText primary="New Conversation" />
        </ListItemButton>
      </Box>

      <Divider />

      <List sx={{ overflow: "auto" }}>
        {conversations.map((conversation) => (
          <ConversationItem
            key={conversation.id}
            conversation={conversation}
            isSelected={selectedConversation?.id === conversation.id}
            onSelect={onSelectConversation}
            onToggleStar={onToggleStar}
            onDelete={onDelete}
          />
        ))}
      </List>
    </>
  );
};

export default ConversationList;
