export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: {
    original: string;
    translated: string;
  };
  languages: {
    from: string;
    to: string;
  };
  timestamp: Date;
  type: 'text' | 'voice';
  status: 'sent' | 'delivered' | 'read';
  metadata?: {
    voiceUrl?: string;
    duration?: number;
  };
}