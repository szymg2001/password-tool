import { Route, Routes } from "react-router-dom";
import GeneratePassword from "./components/GeneratePassword";
import Navbar from "./components/Navbar";
import PasswordsList from "./components/PasswordsList";
import PracticePassword from "./components/PracticePassword";
import "./css/app.css";

function App() {
  return (
    <div className="container">
      <Navbar />
      <Routes>
        <Route path="/" element={<PracticePassword />} />
        <Route path="/generate" element={<GeneratePassword />} />
      </Routes>
      <PasswordsList />
    </div>
  );
}

export default App;
