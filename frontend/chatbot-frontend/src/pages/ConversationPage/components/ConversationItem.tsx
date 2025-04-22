import React from "react";
import {
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Box,
  IconButton,
  Badge,
  Tooltip,
  styled,
} from "@mui/material";
import {
  Star as StarIcon,
  StarBorder as StarBorderIcon,
} from "@mui/icons-material";
import { Conversation } from "../types";

interface ConversationItemProps {
  conversation: Conversation;
  isSelected: boolean;
  onSelect: (conversation: Conversation) => void;
  onToggleStar: (id: number, event: React.MouseEvent) => void;
}

const StyledListItemButton = styled(ListItemButton)<{ active?: boolean }>(
  ({ theme, active }) => ({
    borderRadius: "8px",
    margin: "4px 8px",
    transition: "all 0.2s ease",
    backgroundColor: active ? "rgba(25, 118, 210, 0.08)" : "transparent",
    "&:hover": {
      backgroundColor: active
        ? "rgba(25, 118, 210, 0.12)"
        : "rgba(0, 0, 0, 0.04)",
    },
  }),
);

const ConversationItem: React.FC<ConversationItemProps> = ({
  conversation,
  isSelected,
  onSelect,
  onToggleStar,
}) => {
  // Format date for display
  const formatDate = (date: Date): string => {
    const now = new Date();
    const diffDays = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (diffDays === 0) {
      return "Today";
    } else if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <StyledListItemButton
      onClick={() => onSelect(conversation)}
      active={isSelected}
    >
      <ListItemAvatar>
        <Badge
          color="primary"
          variant="dot"
          // invisible={
          //   conversation.startedAt.getTime() < Date.now() - 24 * 60 * 60 * 1000
          // }
        >
          <Avatar sx={{ bgcolor: "primary.light" }}>
            {conversation.title.charAt(0).toUpperCase()}
          </Avatar>
        </Badge>
      </ListItemAvatar>
      <ListItemText
        primary={conversation.title}
        secondary={
          <Typography
            variant="body2"
            color="text.secondary"
            noWrap
            sx={{ maxWidth: "180px" }}
          >
            {conversation.title}
          </Typography>
        }
        primaryTypographyProps={{
          fontWeight: isSelected ? 600 : 400,
          noWrap: true,
          sx: { maxWidth: "180px" },
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          minWidth: "40px",
        }}
      >
        <Typography variant="caption" color="text.secondary">
          {/* {formatDate(conversation.startedAt)} */}
        </Typography>
        <Tooltip title={conversation.starred ? "Unstar" : "Star"}>
          <IconButton
            size="small"
            onClick={(e) => onToggleStar(conversation.id, e)}
            sx={{ mt: 0.5 }}
          >
            {conversation.starred ? (
              <StarIcon fontSize="small" color="primary" />
            ) : (
              <StarBorderIcon fontSize="small" />
            )}
          </IconButton>
        </Tooltip>
      </Box>
    </StyledListItemButton>
  );
};

export default ConversationItem;
