
import { X, Trash2, ArrowLeft } from "lucide-react";
import { useAuth } from "../store/useAuth";
import { userChat } from "../store/useChat";

const ChatHeader = ({ onClearChat }) => {
  const { selectedUser, setSelectedUser } = userChat();
  const { onlineUsers } = useAuth();

  if (!selectedUser) return null;

  // On phones a history entry is pushed when a chat opens (see Homepage.jsx),
  // so going back through history keeps the browser back button in sync.
  const closeChat = () => {
    if (window.history.state?.chatOpen) window.history.back();
    else setSelectedUser(null);
  };

  return (
    <div className="p-2 md:p-3 border-b border-base-300 bg-base-200 shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 md:gap-3 min-w-0">
          <button
            onClick={closeChat}
            className="btn btn-ghost btn-circle size-10 min-h-0 md:hidden shrink-0"
            aria-label="Back to chats"
          >
            <ArrowLeft size={22} />
          </button>

          <div className="avatar relative shrink-0">
            <div className="size-10 rounded-full border">
              <img
                src={selectedUser.profilePic || "/avtar.png"}
                alt={selectedUser.fullName}
                className="object-cover"
              />
            </div>
            <span
              className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-base-200 ${
                onlineUsers.includes(selectedUser._id)
                  ? "bg-green-500"
                  : "bg-gray-400"
              }`}
            ></span>
          </div>

          <div className="min-w-0">
            <h3 className="font-semibold text-base-content truncate">
              {selectedUser.fullName}
            </h3>
            <p className="text-xs text-base-content/70">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onClearChat}
            className="btn btn-sm btn-outline btn-error tooltip tooltip-left"
            data-tip="Clear Chat"
            aria-label="Clear chat"
          >
            <Trash2 size={16} />
          </button>

          <button
            onClick={closeChat}
            className="hidden md:inline-flex btn btn-sm btn-outline tooltip tooltip-left"
            data-tip="Close Chat"
            aria-label="Close chat"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
