import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Users from "./pages/Users";

function App() {

    return (

        <>
            <Navbar />

            <Routes>

                <Route path="/" element={<Home />} />

                <Route path="/cart" element={<Cart />} />

                <Route path="/users" element={<Users />} />

            </Routes>
        </>

    );

}

export default App;