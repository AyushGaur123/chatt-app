
import React, { useEffect, useRef } from "react";
import { userChat } from "../store/useChat";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuth } from "../store/useAuth";
import { formatMessageTime } from "../lib/utils";
import { toast } from "react-hot-toast";

const ChatContainer = () => {
  const {
    messages,
    getMessage,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unSubscribeFromMessages,
    set,
  } = userChat();

  const { authUser } = useAuth();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!selectedUser?._id) return;
    getMessage(selectedUser._id);
    subscribeToMessages();
    return () => unSubscribeFromMessages();
  }, [selectedUser?._id, getMessage, subscribeToMessages, unSubscribeFromMessages]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);


  const handleClearChat = () => {
  toast(
    (t) => (
      <div className="flex flex-col gap-2">
        <span>Are you sure you want to clear this chat?</span>
        <div className="flex gap-2 justify-end mt-2">
          <button
            className="bg-gray-300 px-3 py-1 rounded"
            onClick={() => toast.dismiss(t.id)}
          >
            Cancel
          </button>
          <button
            className="bg-red-500 text-white px-3 py-1 rounded"
            onClick={async () => {
              await userChat.getState().clearChat();
              toast.dismiss(t.id);

            }}
          >
            Clear
          </button>
        </div>
      </div>
    ),
    { duration: Infinity } 
  );
};


  if (isMessagesLoading)
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader onClearChat={handleClearChat} />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader onClearChat={handleClearChat} />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${
              message.senderId === authUser._id ? "chat-end" : "chat-start"
            }`}
          >
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic || "/avtar.png"
                      : selectedUser.profilePic || "/avtar.png"
                  }
                  alt="profile"
                />
              </div>
            </div>

            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>

            <div className="chat-bubble flex flex-col">
              {message.image && (
                <img
                  src={message.image}
                  alt="attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;

