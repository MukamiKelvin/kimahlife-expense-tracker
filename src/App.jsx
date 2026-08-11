// Import useState from React.
// useState allows App to remember our expenses.
import { useState } from "react";

// Import the Navbar component.
import Navbar from "./components/Navbar";

// Import the SummaryCard component.
import SummaryCard from "./components/SummaryCard";

// Import the ExpenseForm component.
import ExpenseForm from "./components/ExpenseForm";

// Import the ExpenseList component.
import ExpenseList from "./components/ExpenseList";


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

  // Calculate the total amount spent.
//
// reduce() goes through every expense
// and adds its amount to the running total.
const totalExpenses = expenses.reduce(
  (total, expense) => total + expense.amount,
  0
);

const monthlyIncome = 31000;

// Calculate how much money remains
// after subtracting expenses from income.
const balance = monthlyIncome - totalExpenses;

// Check whether the user has a deficit.
//
// If balance is negative, the user spent
// more money than they earned.
const hasDeficit = balance < 0;

  // This function deletes an expense.
//
// It receives the ID of the expense
// we want to remove.
function handleDelete(expenseId) {

  // Create a new array containing every expense
  // EXCEPT the one whose ID matches expenseId.
  setExpenses((previousExpenses) =>
    previousExpenses.filter(
      (expense) => expense.id !== expenseId
    )
  );
}


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
  amount={`KSh ${monthlyIncome.toLocaleString()}`}
/>


          {/* Total expenses */}
          <SummaryCard
  title="Total Expenses"
  amount={`KSh ${totalExpenses.toLocaleString()}`}
/>


          {/* Current balance */}
          <SummaryCard
  title={hasDeficit ? "Deficit" : "Balance"}
  amount={`KSh ${Math.abs(balance).toLocaleString()}`}
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

        {/* 
  Pass our expenses state to ExpenseList.

  ExpenseList will use this data to display
  every expense on the screen.
*/}
<ExpenseList 
expenses={expenses}
onDelete={handleDelete}
 />


      </main>

    </div>
  );
}


// Export App so that main.jsx can render it.
export default App;