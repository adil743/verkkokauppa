import Etusivu from "./etusivu/etusivu";
import MainPage from "./mainpage/mainpage"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CartPage from "./cartpage/cartpage";

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Etusivu />} />
        <Route path="/mainpage" element={<MainPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
