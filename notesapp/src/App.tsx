import axios from "axios";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SingleNote from "./pages/SingleNote";
import CreateNote from "./pages/CreateNote";
import EditNote from "./pages/EditNote";
import Layout from "./components/Layout";
import RegisterUser from "./pages/RegisterUser";
import LoginUser from "./pages/LoginUser";

export const instance = axios.create({
  baseURL: "http://127.0.0.1:8000",
  timeout: 5000,
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/register" element={<RegisterUser />} />
        <Route path="/login" element={<LoginUser />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/note/:id" element={<SingleNote />} />
          <Route path="/create-note/" element={<CreateNote />} />
          <Route path="/note/:id/edit" element={<EditNote />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
