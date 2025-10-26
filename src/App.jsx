import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar"
import Homepage from "./page/Homepage";
import Signup from "./page/Signup";
import Login from "./page/Login";
import Setting from "./page/Setting";
import Profile from "./page/Profile";
import { useAuth } from "./store/useAuth";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import { useTheme } from "./store/useTheme.js"
import { Toaster } from "react-hot-toast";


const App = () => {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuth()

  const { theme } = useTheme()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if (isCheckingAuth && !authUser) return (
    <div className="flex items-center justify-center h-screen">
      <Loader className="size-10 animate-spin" />
    </div>
  )
  
  return (
    <div data-theme={theme}>
      <Navbar />

      <Routes>
        <Route path="/" element={authUser ? <Homepage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <Signup /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/" />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/profile" element={authUser ? <Profile /> : <Navigate to="/login" />} />
      </Routes>

      <Toaster />


    </div>
  )
}

export default App;