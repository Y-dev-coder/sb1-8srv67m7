import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ChatPage } from '@/pages/chat'
import { useAuth } from '@/stores/auth'

function App() {
  const { user, loading } = useAuth()

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChatPage />} />
      </Routes>
    </Router>
  )
}

export default App