// Navbar is the navigation bar
// displayed at the top of KimSpend.

function Navbar() {

  return (

    <nav className="navbar">

      {/* KimSpend brand */}
      <div className="navbar-brand">

        <span className="brand-name">
          KimSpend
        </span>

        <span className="brand-tagline">
          Smart money tracking
        </span>

      </div>


      {/* Navigation links */}
      <div className="navbar-links">

        <a href="#">
          Dashboard
        </a>

        <a href="#">
          Expenses
        </a>

        <a href="#">
          Analytics
        </a>

      </div>

    </nav>

  );
}


// Export Navbar so App.jsx can use it.
export default Navbar;