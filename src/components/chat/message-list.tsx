import { Message } from "@/types"
import { cn } from "@/lib/utils"

interface MessageListProps {
  messages: Message[]
  currentUserId: string
}

export function MessageList({ messages, currentUserId }: MessageListProps) {
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      {messages.map((message) => {
        const isOwnMessage = message.senderId === currentUserId
        
        return (
          <div
            key={message.id}
            className={cn(
              "flex flex-col max-w-[65%]",
              isOwnMessage ? "ml-auto items-end" : "items-start"
            )}
          >
            <div
              className={cn(
                "rounded-sm p-4",
                isOwnMessage 
                  ? "bg-foreground text-background" 
                  : "bg-background text-foreground"
              )}
            >
              <p>{message.content.original}</p>
              <p className="text-sm mt-2 opacity-75">
                {message.content.translated}
              </p>
            </div>
            <span className="text-xs text-foreground/40 mt-2">
              {new Date(message.timestamp).toLocaleTimeString()}
            </span>
          </div>
        )
      })}
    </div>
  )
}