import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatDate } from "@/lib/utils"
import { Conversation } from "@/types"

interface ChatListProps {
  conversations: Conversation[]
  onSelectChat: (conversation: Conversation) => void
  selectedChatId?: string
}

export function ChatList({ conversations, onSelectChat, selectedChatId }: ChatListProps) {
  return (
    <div className="space-y-px">
      {conversations.map((conversation) => (
        <button
          key={conversation.id}
          onClick={() => onSelectChat(conversation)}
          className={cn(
            "w-full flex items-center space-x-4 p-6 transition-colors",
            selectedChatId === conversation.id
              ? "bg-accent"
              : "hover:bg-accent"
          )}
        >
          <Avatar>
            <AvatarImage src={conversation.profileImage} />
            <AvatarFallback>{conversation.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1 text-left space-y-1">
            <h3 className="font-medium tracking-wide">{conversation.name}</h3>
            <p className="text-sm text-foreground/60 truncate">
              {conversation.lastMessage}
            </p>
          </div>
          <span className="text-xs text-foreground/40">
            {formatDate(conversation.lastMessageTime)}
          </span>
        </button>
      ))}
    </div>
  )
}