import { useState } from "react"
import { Send } from "lucide-react"

interface MessageInputProps {
  onSendMessage: (message: string) => void
}

export function MessageInput({ onSendMessage }: MessageInputProps) {
  const [message, setMessage] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      onSendMessage(message)
      setMessage("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-3 p-6 bg-background border-t">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        className="tesla-input"
      />
      <button
        type="submit"
        className="tesla-button"
      >
        <Send className="w-5 h-5" />
      </button>
    </form>
  )
}