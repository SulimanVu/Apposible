import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Main from "./pages/ChatWindow/ChatWindow";
import User from "./pages/User/User";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/user/:id" element={<User />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
