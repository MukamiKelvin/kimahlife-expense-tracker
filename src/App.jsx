// App is the main component of our application.
// Think of a component as a reusable piece of the user interface.
function App() {
  // Everything returned inside here is what React will display
  // on the browser screen.
  return (
    <div>
      {/* This is the main heading of our application */}
      <h1>Personal Expense Tracker</h1>

      {/* This paragraph explains what the application does */}
      <p>Track your income, expenses and monthly spending.</p>
    </div>
  );
}

// We export App so that other files can use this component.
export default App;