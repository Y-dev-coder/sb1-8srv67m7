import { Observable } from '@nativescript/core';
import { Message, Chat } from '../models/chat.model';
import { TranslationService } from './translation.service';

export class ChatService extends Observable {
  private translationService: TranslationService;

  constructor() {
    super();
    this.translationService = new TranslationService();
  }

  async sendMessage(message: Partial<Message>): Promise<void> {
    try {
      // Translate the message
      const translatedText = await this.translationService.translateText(
        message.originalText,
        message.targetLanguage
      );

      const newMessage: Message = {
        ...message,
        id: Date.now().toString(),
        translatedText,
        timestamp: new Date(),
        isVoiceMessage: false,
      } as Message;

      // TODO: Implement Firebase integration to store the message
      console.log('Message sent:', newMessage);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }
}