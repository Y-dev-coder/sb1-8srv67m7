import { Message } from '../../models/message.model';
import { ERRORS } from './constants';
import { MessageValidationError } from './errors';

export function validateMessage(message: Partial<Message>): void {
  if (!message?.content?.original) {
    throw new MessageValidationError(ERRORS.MISSING_CONTENT);
  }
  
  if (!message.senderId) {
    throw new MessageValidationError(ERRORS.MISSING_SENDER);
  }
  
  if (!message.conversationId) {
    throw new MessageValidationError(ERRORS.MISSING_CONVERSATION);
  }
}