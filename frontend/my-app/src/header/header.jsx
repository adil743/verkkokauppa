import { Link } from "react-router-dom";
import "./Header.css";
export default function Header() {
    return(
        <header className="navbar">
              <Link to="/mainpage">
               <div className="logo">Tuottajamarket</div>
                  </Link>
        
                <div className="nav-right">
                  <Link to="/cart">
                    <div className="cart"><i className="fi fi-rr-shopping-cart"></i></div>
                  </Link>
                  <Link to="/">
                    <div className="home">Etusivu</div>
                  </Link>
                </div>
        </header>
    );
}