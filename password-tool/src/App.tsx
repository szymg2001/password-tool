import GeneratePassword from "./components/GeneratePassword";
import { useAppContext } from "./context/appContext";

function App() {
  let appContext = useAppContext();
  return (
    <div className="container">
      <GeneratePassword />
    </div>
  );
}

export default App;
