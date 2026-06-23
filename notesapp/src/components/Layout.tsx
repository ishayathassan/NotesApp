import { Outlet, Link } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <nav style={{ padding: "12px 16px", borderBottom: "1px solid #ddd" }}>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          Home
        </Link>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
