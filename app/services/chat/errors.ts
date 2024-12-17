export class ChatServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ChatServiceError';
  }
}

export class MessageValidationError extends ChatServiceError {
  constructor(message: string) {
    super(message);
    this.name = 'MessageValidationError';
  }
}

export class DatabaseError extends ChatServiceError {
  constructor(message: string) {
    super(message);
    this.name = 'DatabaseError';
  }
}