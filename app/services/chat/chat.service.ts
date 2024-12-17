import { Observable } from '@nativescript/core';
import { Message } from '../../models/message.model';
import { TranslationService } from '../translation/translation.service';
import { firebase } from '@nativescript/firebase-firestore';
import { MESSAGES, ERRORS } from './constants';
import { SendMessageOptions, GetMessagesOptions } from './types';
import { validateMessage } from './validators';
import { DatabaseError, MessageValidationError } from './errors';

export class ChatService extends Observable {
  private db: any;
  private translationService: TranslationService;

  constructor() {
    super();
    this.db = firebase.firestore();
    this.translationService = new TranslationService();
  }

  async sendMessage(options: SendMessageOptions): Promise<void> {
    try {
      const message: Partial<Message> = {
        conversationId: options.conversationId,
        senderId: options.senderId,
        content: {
          original: options.content,
          translated: ''
        },
        type: 'text',
        status: 'sent'
      };

      // Validate the message object
      validateMessage(message);

      // Initialize languages if not provided
      if (!options.languages?.from) {
        const detectedLanguage = await this.translationService.detectLanguage(options.content);
        message.languages = {
          from: detectedLanguage,
          to: options.languages?.to || MESSAGES.DEFAULT_LANGUAGE
        };
      }

      // Translate the message
      const translatedText = await this.translationService.translateText(
        options.content,
        message.languages!.from,
        message.languages!.to
      );

      // Create a new Message object
      const newMessage: Message = {
        id: Date.now().toString(),
        conversationId: message.conversationId!,
        senderId: message.senderId!,
        content: {
          original: options.content,
          translated: translatedText
        },
        languages: message.languages!,
        timestamp: new Date(),
        type: message.type || 'text',
        status: 'sent'
      };

      // Save the message to the database
      await this.db.collection(MESSAGES.COLLECTION).add(newMessage);
    } catch (error) {
      if (error instanceof DatabaseError || error instanceof MessageValidationError) {
        console.error('Error in sendMessage:', error.message);
      } else {
        console.error('Unexpected error in sendMessage:', error);
      }
      throw error;
    }
  }

  async getMessages(options: GetMessagesOptions): Promise<Message[]> {
    try {
      // Validate conversation ID
      if (!options.conversationId) {
        throw new MessageValidationError(ERRORS.MISSING_CONVERSATION);
      }

      // Fetch messages from the database
      let query = this.db
        .collection(MESSAGES.COLLECTION)
        .where('conversationId', '==', options.conversationId)
        .orderBy('timestamp', 'desc')
        .limit(options.limit || MESSAGES.DEFAULT_LIMIT);

      if (options.beforeTimestamp) {
        query = query.where('timestamp', '<', options.beforeTimestamp);
      }

      const snapshot = await query.get();

      // Map and return the messages
      const messages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Message[];

      return messages.reverse();
    } catch (error) {
      if (error instanceof DatabaseError || error instanceof MessageValidationError) {
        console.error('Error in getMessages:', error.message);
      } else {
        console.error('Unexpected error in getMessages:', error);
      }
      throw new DatabaseError(ERRORS.FETCH_FAILED);
    }
  }
}
