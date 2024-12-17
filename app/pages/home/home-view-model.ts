import { Observable } from '@nativescript/core';
import { Conversation } from '../../models/conversation.model';
import { ConversationService } from '../../services/conversation/conversation.service';

export class HomeViewModel extends Observable {
  private _conversations: Conversation[] = [];
  private conversationService: ConversationService;

  constructor() {
    super();
    this.conversationService = new ConversationService();
    this.loadConversations();
  }

  get conversations(): Conversation[] {
    return this._conversations;
  }

  async loadConversations() {
    try {
      this._conversations = await this.conversationService.getConversations();
      this.notifyPropertyChange('conversations', this._conversations);
    } catch (error) {
      console.error('Error loading conversations:', error);
    }
  }

  onNewChat() {
    // Navigate to new chat page
    // Will implement in next step
  }
}