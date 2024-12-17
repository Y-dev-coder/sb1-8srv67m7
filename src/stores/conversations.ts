import { create } from 'zustand'
import { db } from '@/lib/firebase'
import { Conversation } from '@/types'

interface ConversationsState {
  conversations: Conversation[]
  loading: boolean
  error: string | null
  fetchConversations: () => Promise<void>
  createConversation: (conversation: Partial<Conversation>) => Promise<string>
}

export const useConversations = create<ConversationsState>((set) => ({
  conversations: [],
  loading: false,
  error: null,
  fetchConversations: async () => {
    try {
      set({ loading: true })
      const snapshot = await db.collection('conversations').get()
      const conversations = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Conversation[]
      set({ conversations, loading: false })
    } catch (error) {
      set({ error: (error as Error).message, loading: false })
    }
  },
  createConversation: async (conversation) => {
    try {
      const docRef = await db.collection('conversations').add(conversation)
      return docRef.id
    } catch (error) {
      set({ error: (error as Error).message })
      throw error
    }
  }
}))