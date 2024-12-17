import { create } from 'zustand'
import { db } from '@/lib/firebase'
import { Message } from '@/types'

interface MessagesState {
  messages: Message[]
  loading: boolean
  error: string | null
  fetchMessages: (conversationId: string) => Promise<void>
  sendMessage: (message: Partial<Message>) => Promise<void>
}

export const useMessages = create<MessagesState>((set) => ({
  messages: [],
  loading: false,
  error: null,
  fetchMessages: async (conversationId) => {
    try {
      set({ loading: true })
      const snapshot = await db
        .collection('messages')
        .where('conversationId', '==', conversationId)
        .orderBy('timestamp')
        .get()
      
      const messages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Message[]
      
      set({ messages, loading: false })
    } catch (error) {
      set({ error: (error as Error).message, loading: false })
    }
  },
  sendMessage: async (message) => {
    try {
      await db.collection('messages').add({
        ...message,
        timestamp: new Date()
      })
      
      // Optimistically update the messages list
      set(state => ({
        messages: [...state.messages, message as Message]
      }))
    } catch (error) {
      set({ error: (error as Error).message })
      throw error
    }
  }
}))