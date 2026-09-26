const Navbar = () => {
    const storedUser = localStorage.getItem("user");

    const user = storedUser
        ? JSON.parse(storedUser)
        : null;

    return (
        <header className="navbar">
            <div>
                <h1>MailFlow</h1>
            </div>

            <div className="navbar-user">
                {user?.name || "User"}
            </div>
        </header>
    );
};

export default Navbar;