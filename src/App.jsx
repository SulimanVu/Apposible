import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import ChatWindow from "./pages/ChatWindow/ChatWindow";
import User from "./pages/User/User";
import ChatMessage from "./components/ChatMessage/ChatMessage";
import FormRegistration from "./pages/FormRegistration/FormRegistration";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation()

  return (
    <div className="App">
      {/* {location.pathname === '/login' ? null : <Header />} */}
      <Header />
      <Routes>
        <Route path="/chat" element={<ChatWindow />} />
        <Route path="/user/:id" element={<User />} />
        <Route path="/room/:id" element={<ChatMessage />} />
        <Route path="/login" element={<FormRegistration />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
