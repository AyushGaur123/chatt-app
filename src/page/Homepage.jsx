import { useEffect } from 'react'
import { userChat } from '../store/useChat'
import Sidebar from '../components/Sidebar'
import NoChatSelected from '../components/NoChatSelected'
import ChatContainer from '../components/ChatContainer'

const Homepage = () => {
  const { selectedUser, setSelectedUser } = userChat()


  useEffect(() => {
    const onPopState = () => setSelectedUser(null)
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [setSelectedUser])

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 767px)').matches
    if (isMobile && selectedUser && !window.history.state?.chatOpen) {
      window.history.pushState({ ...window.history.state, chatOpen: true }, '')
    }
  }, [selectedUser])

  return (
    // Phones: full-screen app. Contact list sits under the navbar (pt-16);
    // an open chat takes the whole screen (navbar is hidden, see Navbar.jsx).
    // md+: the original centred card layout.
    <div
      className={`h-dvh bg-base-200 md:px-4 md:pt-20 ${
        selectedUser ? 'pt-0' : 'pt-16'
      }`}
    >
      <div className='bg-base-100 md:rounded-lg shadow-xl w-full max-w-6xl mx-auto h-full md:h-[calc(100dvh-8rem)]'>
        <div className='flex h-full md:rounded-lg overflow-hidden'>
          <Sidebar />
          {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
        </div>
      </div>
    </div>
  )
}

export default Homepage
