// Navbar is a component that represents
// the navigation bar at the top of our application.
function Navbar() {
  return (
    <nav>
      {/* The name of our application */}
      <h2>PesaLens</h2>

      {/* Navigation links */}
      <div>
        <span>Dashboard</span>
        <span>Expenses</span>
        <span>Reports</span>
      </div>
    </nav>
  );
}

// Exporting the component allows App.jsx
// to import and use it.
export default Navbar;