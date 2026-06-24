import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Layout() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <div>
      <nav style={{ padding: "12px 16px", borderBottom: "1px solid #ddd" }}>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <button>Home</button>
        </Link>
        {user && (
          <span>
            Welcome, {user.email} <button onClick={handleLogout}>Logout</button>
          </span>
        )}
        {!user && (
          <Link
            to="/login"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <button>Login</button>
          </Link>
        )}
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
