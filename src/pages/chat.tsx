import { useEffect, useState } from "react"
import { ChatList } from "@/components/chat/chat-list"
import { MessageList } from "@/components/chat/message-list"
import { MessageInput } from "@/components/chat/message-input"
import { useConversations } from "@/stores/conversations"
import { useMessages } from "@/stores/messages"
import { useAuth } from "@/stores/auth"

export function ChatPage() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null)
  const { user } = useAuth()
  const { conversations, fetchConversations } = useConversations()
  const { messages, sendMessage, fetchMessages } = useMessages()

  useEffect(() => {
    fetchConversations()
  }, [fetchConversations])

  useEffect(() => {
    if (selectedChat) {
      fetchMessages(selectedChat)
    }
  }, [selectedChat, fetchMessages])

  const handleSendMessage = async (content: string) => {
    if (!selectedChat || !user) return

    await sendMessage({
      content,
      conversationId: selectedChat,
      senderId: user.id
    })
  }

  return (
    <div className="flex h-screen bg-background">
      <div className="w-1/3 border-r border-foreground/10">
        <div className="p-6 border-b border-foreground/10">
          <h1 className="text-2xl font-medium">Sloopair</h1>
        </div>
        <ChatList
          conversations={conversations}
          onSelectChat={(chat) => setSelectedChat(chat.id)}
          selectedChatId={selectedChat}
        />
      </div>
      <div className="flex-1 flex flex-col bg-accent">
        {selectedChat ? (
          <>
            <MessageList
              messages={messages}
              currentUserId={user?.id || ""}
            />
            <MessageInput onSendMessage={handleSendMessage} />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-light">Start Connecting</h2>
              <p className="text-foreground/60">
                Select a conversation to begin your journey
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}