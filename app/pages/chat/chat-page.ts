import { NavigatedData, Page } from '@nativescript/core';
import { ChatViewModel } from './chat-view-model';

export function onNavigatingTo(args: NavigatedData) {
  const page = args.object as Page;
  const conversationId = args.context?.conversationId;
  
  if (!conversationId) {
    console.error('No conversation ID provided');
    return;
  }

  page.bindingContext = new ChatViewModel(conversationId);
}