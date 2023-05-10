import { Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Verify from "./components/Verify";
import Success from "./components/Success.js";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </div>
  );
}

export default App;
