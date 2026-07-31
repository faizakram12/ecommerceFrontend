import { Link } from "react-router-dom";
import "../css/Navbar.css";

function Navbar() {

    return (

        <nav className="navbar">

            <h2>E-Commerce</h2>

            <div className="nav-links">

                <Link to="/">Products</Link>

                <Link to="/cart">Cart</Link>

                <Link to="/users">Users</Link>

            </div>

        </nav>

    );

}

export default Navbar;