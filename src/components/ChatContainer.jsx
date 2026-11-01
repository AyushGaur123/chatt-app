import React, { useEffect, useRef, useState } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";

import { userChat } from "../store/useChat";
import { useAuth } from "../store/useAuth";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";

import {
  formatMessageTime,
  formatMessageDate,
} from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessage,
    deleteMessage,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unSubscribeFromMessages,
  } = userChat();

  const { authUser } = useAuth();
  const messagesEndRef = useRef(null);
  // Phones have no hover: tapping your own message reveals its delete button.
  const [activeMessageId, setActiveMessageId] = useState(null);

  useEffect(() => {
    if (!selectedUser?._id) return;

    getMessage(selectedUser._id);
    subscribeToMessages();

    return () => unSubscribeFromMessages();
  }, [
    selectedUser?._id,
    getMessage,
    subscribeToMessages,
    unSubscribeFromMessages,
  ]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
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

  const handleDeleteMessage = (messageId) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-2">
          <span>Delete this message?</span>

          <div className="flex justify-end gap-2">
            <button
              className="bg-gray-300 px-3 py-1 rounded"
              onClick={() => toast.dismiss(t.id)}
            >
              Cancel
            </button>

            <button
              className="bg-red-500 text-white px-3 py-1 rounded"
              onClick={async () => {
                await deleteMessage(messageId);
                toast.dismiss(t.id);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ),
      { duration: Infinity }
    );
  };

  if (isMessagesLoading) {
    return (
      <div className="flex-1 min-w-0 min-h-0 flex flex-col overflow-hidden">
        <ChatHeader onClearChat={handleClearChat} />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 min-w-0 min-h-0 flex flex-col overflow-hidden">
      <ChatHeader onClearChat={handleClearChat} />

      <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-3 md:p-4 space-y-4">
        {messages.map((message, index) => {
          const currentDate = new Date(
            message.createdAt
          ).toDateString();

          const previousDate =
            index > 0
              ? new Date(
                messages[index - 1].createdAt
              ).toDateString()
              : null;

          const showDateSeparator =
            currentDate !== previousDate;

          return (
            <React.Fragment key={message._id}>
              {showDateSeparator && (
                <div className="flex justify-center my-4">
                  <div className="bg-base-300 px-4 py-2 rounded-full text-sm font-medium shadow">
                    {formatMessageDate(message.createdAt)}
                  </div>
                </div>
              )}

              <div
                className={`chat ${message.senderId === authUser._id
                    ? "chat-end"
                    : "chat-start"
                  }`}
              >
                <div className="chat-image avatar hidden md:block">
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

                <div
                  className="chat-bubble flex flex-col relative group break-words"
                  onClick={() =>
                    message.senderId === authUser._id &&
                    setActiveMessageId((id) =>
                      id === message._id ? null : message._id
                    )
                  }
                >
                  {message.image && (
                    <img
                      src={message.image}
                      alt="attachment"
                      className="max-w-full sm:max-w-[200px] rounded-md mb-2"
                    />
                  )}

                  {message.text && <p>{message.text}</p>}

                  {message.senderId === authUser._id && (
                    <button
                      onClick={() =>
                        handleDeleteMessage(message._id)
                      }

                      className="
                              hidden md:block
                              absolute
                             -left-10
                             top-1/2
                             -translate-y-1/2
                             opacity-0
                             group-hover:opacity-100
                             transition-all
                             duration-200
                             cursor-pointer
                             bg-base-300
                             hover:bg-error
                             hover:text-white
                             p-2
                             rounded-full
                             shadow-md
                             z-10
                           "

                    >
                      <Trash2 size={14} />
                    </button>
                  )}

                  {message.senderId === authUser._id &&
                    activeMessageId === message._id && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveMessageId(null);
                          handleDeleteMessage(message._id);
                        }}
                        className="md:hidden mt-2 flex items-center gap-1 self-end text-xs underline opacity-80"
                      >
                        <Trash2 size={12} /> Delete
                      </button>
                    )}
                </div>


              </div>
            </React.Fragment>
          );
        })}

        <div ref={messagesEndRef} />
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;