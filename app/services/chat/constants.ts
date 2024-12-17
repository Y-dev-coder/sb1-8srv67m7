export const MESSAGES = {
  COLLECTION: 'messages',
  DEFAULT_LIMIT: 50,
  DEFAULT_LANGUAGE: 'en'
} as const;

export const ERRORS = {
  MISSING_CONTENT: 'Message content is required',
  MISSING_SENDER: 'Sender ID is required',
  MISSING_CONVERSATION: 'Conversation ID is required',
  FETCH_FAILED: 'Failed to fetch messages from the database'
} as const;