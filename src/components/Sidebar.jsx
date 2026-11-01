

import { useEffect, useState } from "react";
import { userChat } from "../store/useChat";
import { useAuth } from "../store/useAuth";
import SidebarSkelton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";

// Layout by screen size:
//   < md  : full-width contact list (WhatsApp style). Hidden while a chat is open.
//   md-lg : narrow icon-only strip next to the chat
//   lg+   : full sidebar next to the chat
const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = userChat();

  const { onlineUsers } = useAuth();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkelton />;

  return (
    <aside
      className={`
        h-full w-full md:w-20 lg:w-72 shrink-0 border-r border-base-300
        flex-col transition-all duration-200
        ${selectedUser ? "hidden md:flex" : "flex"}
      `}
    >
      <div className="border-b border-base-300 w-full p-4 md:p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium md:hidden lg:block">Contacts</span>
        </div>
        <div className="mt-3 flex md:hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm"
            />
            <span className="text-sm">Show online only</span>
          </label>
          <span className="text-xs text-zinc-500">
            ({Math.max(onlineUsers.length - 1, 0)} online)
          </span>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain w-full py-1 md:py-3">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              w-full px-4 py-3 md:p-3 flex items-center gap-3
              hover:bg-base-300 active:bg-base-300 transition-colors
              ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}
            `}
          >
            <div className="relative shrink-0 mx-0 md:mx-auto lg:mx-0">
              <img
                src={user.profilePic || "/avtar.png"}
                alt={user.fullName}
                className="size-12 object-cover rounded-full border-1"
              />
              {onlineUsers.includes(user._id) && (
                <span
                  className="absolute bottom-0 right-0 size-3 bg-green-500
                  rounded-full ring-2 ring-base-100"
                />
              )}
            </div>

            <div className="block md:hidden lg:block text-left min-w-0 flex-1">
              <div className="font-medium truncate">{user.fullName}</div>
              <div className="text-sm text-zinc-400">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-zinc-500 py-4">
            {showOnlineOnly ? "No online users" : "No contacts yet"}
          </div>
        )}
      </div>
    </aside>
  );
};
export default Sidebar;
