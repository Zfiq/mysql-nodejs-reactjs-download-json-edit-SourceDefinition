import "./App.css";
import Users from "./pages/Users";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Users />} />
          {/* <Route path="/add" element={<Add />} />
          <Route path="/update/:id" element={<Update />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
