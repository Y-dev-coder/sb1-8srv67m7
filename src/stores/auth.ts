import { create } from 'zustand'
import { auth } from '@/lib/firebase'
import { User } from '@/types'

interface AuthState {
  user: User | null
  loading: boolean
  error: string | null
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  loading: true,
  error: null,
  signIn: async (email: string, password: string) => {
    try {
      set({ loading: true, error: null })
      const userCredential = await auth.signInWithEmailAndPassword(email, password)
      set({ user: userCredential.user as User, loading: false })
    } catch (error) {
      set({ error: (error as Error).message, loading: false })
    }
  },
  signOut: async () => {
    try {
      await auth.signOut()
      set({ user: null })
    } catch (error) {
      set({ error: (error as Error).message })
    }
  }
}))