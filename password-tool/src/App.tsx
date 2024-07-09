import { Route, Routes } from "react-router-dom";
import GeneratePassword from "./components/GeneratePassword";
import { useAppContext } from "./context/appContext";

function App() {
  let appContext = useAppContext();
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/generate" element={<GeneratePassword />} />
      </Routes>
    </div>
  );
}

export default App;
