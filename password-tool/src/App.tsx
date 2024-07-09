import { Route, Routes } from "react-router-dom";
import GeneratePassword from "./components/GeneratePassword";
import Navbar from "./components/Navbar";
import PasswordsList from "./components/PasswordsList";

function App() {
  return (
    <div className="container">
      <Navbar />
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/generate" element={<GeneratePassword />} />
      </Routes>
      <PasswordsList />
    </div>
  );
}

export default App;
