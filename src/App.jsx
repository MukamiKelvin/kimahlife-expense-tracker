// Import the Navbar component.
import Navbar from "./components/Navbar";

// Import the SummaryCard component.
import SummaryCard from "./components/SummaryCard";

// Import the ExpenseForm component.
import ExpenseForm from "./components/ExpenseForm";

// App is the main component of our application.
function App() {
  return (
    <div>
      {/* Display our navigation bar */}
      <Navbar />

      {/* Main content */}
      <main>

        {/* Dashboard heading */}
        <h1>Financial Dashboard</h1>

        {/* Description */}
        <p>
          Welcome to your PesaLens financial dashboard.
        </p>

        {/* Financial summary */}
        <section>

          {/* Income */}
          <SummaryCard
            title="Monthly Income"
            amount="KSh 31,000"
          />

          {/* Expenses */}
          <SummaryCard
            title="Total Expenses"
            amount="KSh 24,500"
          />

          {/* Balance */}
          <SummaryCard
            title="Balance"
            amount="KSh 6,500"
          />

        </section>

        {/* Add expense form */}
        <ExpenseForm />

      </main>
    </div>
  );
}

// Export App.
export default App;