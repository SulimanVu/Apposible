import { Route, Routes } from "react-router-dom";
// import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import ChatWindow from "./pages/ChatWindow/ChatWindow";
import ChatMessage from "./components/ChatMessage/ChatMessage";
import FormRegistration from "./pages/FormRegistration/FormRegistration";
import { useLocation } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import SignIn from "./components/Login/SignIn";
import SignUp from "./components/Registr/SignUp";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

function App() {
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname === "/signin" ||
      location.pathname === "/signup" ? null : (
        <Header />
      )}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/chat" element={<ChatWindow />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route path="/room/:id" element={<ChatMessage />} />
        <Route path="/login" element={<FormRegistration />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
