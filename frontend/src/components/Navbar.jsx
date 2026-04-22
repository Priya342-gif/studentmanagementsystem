import { Link } from "react-router-dom";
import { logout, isAuthenticated } from "../utils/auth";

const Navbar = () => {
    return (
        <nav className="navbar">
            <h2>Student System</h2>

            <div>
                {!isAuthenticated() ? (
                    <>
                        <Link to="/">Register</Link>
                        <Link to="/login">Login</Link>
                    </>
                ) : (
                    <button onClick={logout}>Logout</button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;