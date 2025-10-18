import React from 'react'
import { userChat } from '../store/useChat'
import ChatHeader from './ChatHeader'
import MessageInput from './MessageInput'
import { useEffect } from 'react'
import MessageSkeleton from './skeletons/MessageSkeleton'
import { useAuth } from '../store/useAuth'
import { formatMessageTime } from '../lib/utils'

const ChatContainer = () => {
  const {messages,getMessage,isMessagesLoading,selectedUser,subscribeToMessages,unSubscribeFromMessages}=userChat()
    const {authUser} = useAuth()


useEffect(() => {
  getMessage(selectedUser._id)
  subscribeToMessages()
  return ()=>unSubscribeFromMessages()
}, [selectedUser._id,getMessage,unSubscribeFromMessages, subscribeToMessages])


if(isMessagesLoading) return(

  <div className='flex-1 flex flex-col overflow-auto'>
    <ChatHeader/>
    <MessageSkeleton/>
    <MessageInput/>
  </div>
) 

  return (
    <div className='flex-1 flex flex-col overflow-auto'>
      <ChatHeader/>
     <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((messages)=>(
        <div
         key={messages._id}
        className={`chat ${messages.senderId===authUser._id?"chat-end":"chat-start"}`}
        >
          <div className='chat-image avatar'>
            <div className='size-10 rounded-full border'>
              <img 
              src={ messages.senderId===authUser._id?authUser.profilePic||"/avtar.png":selectedUser.profilePic||"/avtar.png"}
               alt=" profile"
                />

            </div>
          </div>
          <div className="chat-header mb-1">
            <time className='text-xs opacity-50 ml-1'>
              {formatMessageTime(messages.createdAt)}
            </time>
          </div>
          <div className='chat-bubble flex flex-col'>
            {messages.image&&(
              <img src={messages.image} alt="attach" className='sm:max-w-[200px] rounded-md mb-2 ' />
            )}
            {messages.text&&<p>{messages.text}</p>}
            
     
          </div>
        </div>
      )

      )}
      </div> 
     

      <MessageInput/>
      
      
      </div>
  )
}

export default ChatContainer