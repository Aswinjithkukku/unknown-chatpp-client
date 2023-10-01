import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Importing Pages.
import Navbar from "./Components/Navbar";
import ChatPage from "./Pages/ChatPage";

function App() {
  return (
    <div>
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<ChatPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
