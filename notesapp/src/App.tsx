import axios from "axios";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SingleNote from "./pages/SingleNote";
import CreateNote from "./pages/CreateNote";

export const instance = axios.create({
  baseURL: "http://127.0.0.1:8000",
  timeout: 5000,
});

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/note/:id" element={<SingleNote />} />
        <Route path="/create-note/" element={<CreateNote />} />
      </Routes>
    </div>
  );
}

export default App;
