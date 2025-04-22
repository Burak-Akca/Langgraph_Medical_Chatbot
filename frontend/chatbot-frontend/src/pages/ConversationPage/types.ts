// Define shared types for conversation components
export interface Message {
  id: string;
  conversationId: string;
  messageText: string;
  sender: "user" | "bot";
  timestamp: string;
}

export interface Conversation {
  id: string;
  userId: string;
  title: string;
  startedAt: Date;
  status: "active" | "archived";
  starred: boolean;
}
