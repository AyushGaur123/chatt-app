import { X, Trash2 } from "lucide-react";
import { useAuth } from "../store/useAuth";
import { userChat } from "../store/useChat";

const ChatHeader = ({ onClearChat }) => {
  const { selectedUser, setSelectedUser } = userChat();
  const { onlineUsers } = useAuth();

  if (!selectedUser) return null;

  return (
    <div className="p-3 border-b border-base-300 bg-base-200 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="avatar relative">
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

          <div>
            <h3 className="font-semibold text-base-content">
              {selectedUser.fullName}
            </h3>
            <p className="text-xs text-base-content/70">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onClearChat}
            className="btn btn-sm btn-outline btn-error tooltip tooltip-left"
            data-tip="Clear Chat"
          >
            <Trash2 size={16} />
          </button>

          <button
            onClick={() => setSelectedUser(null)}
            className="btn btn-sm btn-outline tooltip tooltip-left"
            data-tip="Close Chat"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
