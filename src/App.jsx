// Import the Navbar component.
import Navbar from "./components/Navbar";

// Import the SummaryCard component.
import SummaryCard from "./components/SummaryCard";

// App is the main component of our application.
function App() {
  return (
    <div>
      {/* Display our navigation bar */}
      <Navbar />

      {/* Main content of our application */}
      <main>
        {/* Main dashboard heading */}
        <h1>Financial Dashboard</h1>

        {/* Short description */}
        <p>Welcome to your personal expense tracker.</p>

        {/* Financial summary section */}
        <section>

          {/* Monthly income card */}
          <SummaryCard
            title="Monthly Income"
            amount="KSh 31,000"
          />

          {/* Total expenses card */}
          <SummaryCard
            title="Total Expenses"
            amount="KSh 24,500"
          />

          {/* Remaining balance card */}
          <SummaryCard
            title="Balance"
            amount="KSh 6,500"
          />

        </section>
      </main>
    </div>
  );
}

// Export App so React can render it.
export default App;