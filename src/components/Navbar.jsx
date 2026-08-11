function Navbar() {
  return (
    <nav className="navbar">

      {/* Brand */}
      <div className="navbar-brand">
        <span className="brand-name">
          KimSpend
        </span>

        <span className="brand-tagline">
          Smart Money Tracking
        </span>
      </div>

      {/* Navigation */}
      <div className="navbar-links">

        <a href="#dashboard">
          Dashboard
        </a>

        <a href="#analytics">
          Analytics
        </a>

        <a href="#expenses">
          Expenses
        </a>

      </div>

    </nav>
  );
}

export default Navbar;