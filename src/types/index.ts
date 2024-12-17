export interface User {
  id: string
  email: string
  displayName: string
  photoURL?: string
}

export interface Conversation {
  id: string
  name: string
  participants: string[]
  lastMessage: string
  lastMessageTime: Date
  profileImage?: string
  language: string
}

export interface Message {
  id: string
  conversationId: string
  senderId: string
  content: {
    original: string
    translated: string
  }
  timestamp: Date
  type: 'text' | 'voice'
  status: 'sent' | 'delivered' | 'read'
  metadata?: {
    voiceUrl?: string
    duration?: number
  }
}