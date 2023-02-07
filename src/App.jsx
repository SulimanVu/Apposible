import { Route, Routes } from "react-router-dom";
// import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import ChatWindow from "./pages/ChatWindow/ChatWindow";
import User from "./pages/User/User";
import ChatMessage from "./components/ChatMessage/ChatMessage";
import FormRegistration from "./pages/FormRegistration/FormRegistration";
import { useLocation } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import SignIn from "./components/Login/SignIn";
import SignUp from "./components/Registr/SignUp";

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
        <Route path="/user/:id" element={<User />} />
        <Route path="/room/:id" element={<ChatMessage />} />
        <Route path="/login" element={<FormRegistration />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
