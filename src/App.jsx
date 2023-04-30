import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import ChatWindow from "./pages/ChatWindow/ChatWindow";
import ChatMessage from "./components/ChatMessage/ChatMessage";
import FormRegistration from "./pages/FormRegistration/FormRegistration";
import { useLocation } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import SignIn from "./components/Login/SignIn";
import SignUp from "./components/Registr/SignUp";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import ChatInfo from "./pages/ChatInfo/ChatInfo";

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
        <Route path="/room/info/:id" element={<ChatInfo />} />
        <Route path="/login" element={<FormRegistration />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        {/* <Route path={`/api/files/file/:name`} element={<Doc />} /> */}
      </Routes>
    </div>
  );
}

export default App;
