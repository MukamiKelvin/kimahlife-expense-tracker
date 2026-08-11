// Import useState from React.
// useState allows App to remember our expenses.
import { useState } from "react";

// Import the Navbar component.
import Navbar from "./components/Navbar";

// Import the SummaryCard component.
import SummaryCard from "./components/SummaryCard";

// Import the ExpenseForm component.
import ExpenseForm from "./components/ExpenseForm";


// App is the main component of PesaLens.
function App() {

  // Create a state variable called "expenses".
  //
  // expenses = contains all the expenses we have added.
  // setExpenses = function used to update the expenses.
  //
  // We start with an empty array because we haven't
  // added any expenses yet.
  const [expenses, setExpenses] = useState([]);


  return (
    <div>

      {/* Display the navigation bar */}
      <Navbar />


      {/* Main content of our application */}
      <main>

        {/* Main dashboard heading */}
        <h1>Financial Dashboard</h1>

        {/* Short description of the application */}
        <p>
          Welcome to your PesaLens financial dashboard.
        </p>


        {/* Financial summary section */}
        <section>

          {/* Monthly income */}
          <SummaryCard
            title="Monthly Income"
            amount="KSh 31,000"
          />


          {/* Total expenses */}
          <SummaryCard
            title="Total Expenses"
            amount="KSh 24,500"
          />


          {/* Current balance */}
          <SummaryCard
            title="Balance"
            amount="KSh 6,500"
          />

        </section>


        {/* 
          ExpenseForm receives setExpenses as a prop.

          This allows ExpenseForm to add new expenses
          to the expenses state that belongs to App.
        */}
        <ExpenseForm
          setExpenses={setExpenses}
        />

      </main>

    </div>
  );
}


// Export App so that main.jsx can render it.
export default App;