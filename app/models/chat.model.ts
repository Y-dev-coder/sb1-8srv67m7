export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  originalText: string;
  translatedText: string;
  originalLanguage: string;
  targetLanguage: string;
  timestamp: Date;
  isVoiceMessage: boolean;
  voiceUrl?: string;
}

export interface Chat {
  id: string;
  participants: string[];
  lastMessage: Message;
  updatedAt: Date;
}