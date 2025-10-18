

import { useState } from "react";
import { useAuth } from "../store/useAuth";
import { Camera, Mail, User } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuth();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="min-h-screen flex justify-center items-center pt-16 bg-base-200">
      {/* Container */}
      <div className="bg-base-300 rounded-xl shadow-lg p-8 w-full max-w-md flex flex-col items-center space-y-6 overflow-hidden">
        {/* === Header === */}
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Profile</h1>
          <p className="text-sm mt-1 text-zinc-400">Your profile information</p>
        </div>

        {/* === Avatar Section === */}
        <div className="flex flex-col items-center gap-3">
          <div className="relative">
            <img
              src={selectedImg || authUser?.profilePic || "/avtar.png"}
              // alt="Profile"
              className="size-28 rounded-full object-cover border-4 border-base-100 shadow-md"
            />
            <label
              htmlFor="avatar-upload"
              className={`absolute bottom-0 right-0 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200 ${
                isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
              }`}
            >
              <Camera className="w-5 h-5 text-base-200" />
              <input
                type="file"
                id="avatar-upload"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUpdatingProfile}
              />
            </label>
          </div>
          <p className="text-xs text-zinc-400">
            {isUpdatingProfile ? "Uploading..." : "Click camera icon to update"}
          </p>
        </div>

        {/* === User Info === */}
        <div className="w-full space-y-4">
          <div>
            <div className="text-xs text-zinc-400 flex items-center gap-2 mb-1">
              <User className="w-4 h-4" /> Full Name
            </div>
            <p className="px-4 py-2 bg-base-100 rounded-lg border border-base-300">
              {authUser?.fullName}
            </p>
          </div>

          <div>
            <div className="text-xs text-zinc-400 flex items-center gap-2 mb-1">
              <Mail className="w-4 h-4" /> Email
            </div>
            <p className="px-4 py-2 bg-base-100 rounded-lg border border-base-300">
              {authUser?.email}
            </p>
          </div>
        </div>

        {/* === Account Info === */}
        <div className="w-full bg-base-200 rounded-xl p-4 text-sm space-y-2">
          <div className="flex items-center justify-between border-b border-base-300 pb-2">
            <span>Member Since</span>
            <span className="z-10 ">{authUser?.createdAt?.split("T")[0]}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Account Status</span>
            <span className="text-green-500 font-medium">Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
