import { Observable } from '@nativescript/core';
import { Conversation } from '../../models/conversation.model';
import { firebase } from '@nativescript/firebase-firestore';

export class ConversationService extends Observable {
  private db: any;

  constructor() {
    super();
    this.db = firebase.firestore();
  }

  async getConversations(): Promise<Conversation[]> {
    try {
      const snapshot = await this.db.collection('conversations').get();
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Conversation[];
    } catch (error) {
      console.error('Error fetching conversations:', error);
      return [];
    }
  }

  async createConversation(conversation: Partial<Conversation>): Promise<string> {
    try {
      const docRef = await this.db.collection('conversations').add(conversation);
      return docRef.id;
    } catch (error) {
      console.error('Error creating conversation:', error);
      throw error;
    }
  }
}