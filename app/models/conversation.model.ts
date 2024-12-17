export interface Conversation {
  id: string;
  name: string;
  participants: string[];
  lastMessage: string;
  lastMessageTime: Date;
  profileImage?: string;
  language: string;
}