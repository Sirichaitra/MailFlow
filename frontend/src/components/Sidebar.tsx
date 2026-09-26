import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = () => {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <aside className="sidebar">
            <div className="sidebar-logo">
                <h2>MailFlow</h2>
            </div>

            <nav>
                <NavLink to="/dashboard">Dashboard</NavLink>
                <NavLink to="/customers">Customers</NavLink>
                <NavLink to="/segments">Segments</NavLink>
                <NavLink to="/templates">Templates</NavLink>
                <NavLink to="/campaigns">Campaigns</NavLink>
                <NavLink to="/send-email">Send Email</NavLink>
            </nav>

            <button className="logout-button" onClick={logout}>
                Logout
            </button>
        </aside>
    );
};

export default Sidebar;