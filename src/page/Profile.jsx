
import { useState } from "react";
import { useAuth } from "../store/useAuth";
import { Camera, Mail, User, CalendarDays } from "lucide-react";

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
    <div className="min-h-screen flex justify-center items-center pt-16 bg-base-200 px-4">
      <div className="card bg-base-100 shadow-xl w-full max-w-md">
        <div className="card-body items-center text-center gap-6">
          {/* Avatar */}
          <div className="avatar relative">
            <div
              className={`w-28 rounded-full ring ring-base-300 ring-offset-base-100 ring-offset-2 ${
                isUpdatingProfile ? "opacity-60" : ""
              }`}
            >
              <img
                src={selectedImg || authUser?.profilePic || "/avtar.png"}
                alt="Profile"
              />
            </div>
            <label
              htmlFor="avatar-upload"
              className={`absolute bottom-0 right-0 btn btn-circle btn-sm btn-primary ${
                isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
              }`}
            >
              <Camera className="w-4 h-4" />
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

          <div>
            <h1 className="text-xl font-semibold">{authUser?.fullName}</h1>
            <p className="text-sm text-base-content/60 mt-1">
              {isUpdatingProfile ? "Uploading..." : authUser?.email}
            </p>
          </div>

          <div className="divider my-0 w-full" />

          {/* Info rows */}
          <div className="w-full space-y-4 text-left">
            <div className="flex items-center gap-3">
              <User className="w-4 h-4 text-base-content/50 shrink-0" />
              <div>
                <p className="text-xs text-base-content/50">Full Name</p>
                <p className="font-medium">{authUser?.fullName}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-base-content/50 shrink-0" />
              <div>
                <p className="text-xs text-base-content/50">Email</p>
                <p className="font-medium">{authUser?.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <CalendarDays className="w-4 h-4 text-base-content/50 shrink-0" />
              <div>
                <p className="text-xs text-base-content/50">Member Since</p>
                <p className="font-medium">
                  {authUser?.createdAt?.split("T")[0]}
                </p>
              </div>
            </div>
          </div>

          <div className="divider my-0 w-full" />

          <div className="flex items-center justify-between w-full">
            <span className="text-sm text-base-content/60">
              Account Status
            </span>
            <span className="badge badge-success badge-outline">Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;