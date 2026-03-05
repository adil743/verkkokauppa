import Etusivu from "./etusivu/etusivu";
import MainPage from "./mainpage/mainpage"
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Etusivu />} />
        <Route path="/mainpage" element={<MainPage />} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
