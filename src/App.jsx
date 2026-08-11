// Import useState from React.
// useState allows App to remember information
// and update the screen when that information changes.
import { useState } from "react";

// Import the Navbar component.
import Navbar from "./components/Navbar";

// Import the SummaryCard component.
import SummaryCard from "./components/SummaryCard";

// Import the ExpenseForm component.
import ExpenseForm from "./components/ExpenseForm";

// Import the ExpenseList component.
import ExpenseList from "./components/ExpenseList";

// Import the IncomeForm component.
import IncomeForm from "./components/IncomeForm";


// App is the main component of PesaLens.
function App() {

  // ==========================================
  // EXPENSE STATE
  // ==========================================

  // Store all expenses in our application.
  const [expenses, setExpenses] = useState([]);


  // ==========================================
  // INCOME STATE
  // ==========================================

  // Store the user's monthly income.
  // We start with KSh 31,000 for now.
  const [monthlyIncome, setMonthlyIncome] = useState(31000);


  // ==========================================
  // SELECTED MONTH STATE
  // ==========================================

  // Store the month that the user wants to analyze.
  //
  // Format:
  // YYYY-MM
  //
  // Example:
  // 2026-08 = August 2026
  const [selectedMonth, setSelectedMonth] = useState("2026-08");


  // ==========================================
  // MONTHLY EXPENSES
  // ==========================================

  // Get only the expenses belonging to
  // the currently selected month.
  const monthlyExpenses = expenses.filter((expense) =>
    expense.date.startsWith(selectedMonth)
  );


  // ==========================================
  // MONTHLY TOTAL
  // ==========================================

  // Calculate how much was spent during
  // the selected month.
  const monthlyTotal = monthlyExpenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );


  // ==========================================
  // CATEGORY TOTALS
  // ==========================================

  // Calculate how much was spent in each
  // category for the selected month.
  //
  // Example result:
  //
  // {
  //   Food: 5000,
  //   Transport: 3000,
  //   Rent: 8500
  // }
  const categoryTotals = monthlyExpenses.reduce(
    (totals, expense) => {

      // Get the category of the current expense.
      const category = expense.category;


      // If this category doesn't exist yet,
      // create it and start it at zero.
      if (!totals[category]) {
        totals[category] = 0;
      }


      // Add the expense amount to the
      // correct category.
      totals[category] += expense.amount;


      // Return the updated totals object.
      return totals;

    },
    {}
  );


  // ==========================================
  // TOTAL EXPENSES
  // ==========================================

  // Calculate the total amount spent across
  // ALL recorded expenses.
  const totalExpenses = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );


  // ==========================================
  // OVERALL BALANCE
  // ==========================================

  // Calculate the overall balance.
  const balance = monthlyIncome - totalExpenses;


  // ==========================================
  // MONTHLY BALANCE
  // ==========================================

  // Calculate the balance for the selected month.
  const monthlyBalance = monthlyIncome - monthlyTotal;


  // ==========================================
  // DEFICIT CHECK
  // ==========================================

  // Check whether the overall balance is negative.
  const hasDeficit = balance < 0;


  // ==========================================
  // DELETE EXPENSE
  // ==========================================

  // Delete an expense using its ID.
  function handleDelete(expenseId) {

    // Keep every expense except the one
    // whose ID matches expenseId.
    setExpenses((previousExpenses) =>
      previousExpenses.filter(
        (expense) => expense.id !== expenseId
      )
    );
  }


  // ==========================================
  // DISPLAY THE APPLICATION
  // ==========================================

  return (
    <div>

      {/* Display the navigation bar */}
      <Navbar />


      {/* Main content of the application */}
      <main>


        {/* ==================================
            DASHBOARD HEADING
        ================================== */}

        <h1>Financial Dashboard</h1>

        <p>
          Welcome to your PesaLens financial dashboard.
        </p>


        {/* ==================================
            FINANCIAL SUMMARY
        ================================== */}

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


          {/* Balance or deficit */}
          <SummaryCard
            title={hasDeficit ? "Deficit" : "Balance"}
            amount={`KSh ${Math.abs(balance).toLocaleString()}`}
          />

        </section>


        {/* ==================================
            MONTHLY OVERVIEW
        ================================== */}

        <section>

          <h2>Monthly Overview</h2>


          {/* Month selector */}
          <label>
            Select Month:
          </label>


          <input
            type="month"

            // Show the currently selected month.
            value={selectedMonth}

            // Update the selected month whenever
            // the user chooses another month.
            onChange={(event) =>
              setSelectedMonth(event.target.value)
            }
          />


          {/* Display the selected month */}
          <p>
            Selected Month: {selectedMonth}
          </p>


          {/* Display monthly spending */}
          <p>
            Monthly Spending: KSh{" "}
            {monthlyTotal.toLocaleString()}
          </p>


          {/* Display monthly balance */}
          <p>
            Monthly Balance: KSh{" "}
            {monthlyBalance.toLocaleString()}
          </p>

        </section>


        {/* ==================================
    CATEGORY ANALYSIS
================================== */}

<section>

  <h2>Spending by Category</h2>

  {Object.entries(categoryTotals).map(
    ([category, total]) => {

      // Calculate what percentage of the
      // month's total spending belongs to
      // this category.
      //
      // Example:
      // Shoes = 3,500
      // Monthly spending = 3,500
      //
      // 3,500 / 3,500 * 100 = 100%
      const spendingPercentage =
        monthlyTotal > 0
          ? (total / monthlyTotal) * 100
          : 0;


      // Calculate what percentage of the
      // user's monthly income was spent
      // on this category.
      //
      // Example:
      // Shoes = 3,500
      // Income = 31,000
      //
      // 3,500 / 31,000 * 100 = 11.3%
      const incomePercentage =
        monthlyIncome > 0
          ? (total / monthlyIncome) * 100
          : 0;


      // Display the category information.
      return (
        <div key={category}>

          {/* Category name */}
          <p>
            <strong>{category}</strong>
          </p>


          {/* Amount spent in this category */}
          <p>
            KSh {total.toLocaleString()}
          </p>


          {/* Percentage of total monthly spending */}
          <p>
            {spendingPercentage.toFixed(1)}%
            of monthly spending
          </p>


          {/* Percentage of monthly income */}
          <p>
            {incomePercentage.toFixed(1)}%
            of monthly income
          </p>

        </div>
      );
    }
  )}

</section>


        {/* ==================================
            INCOME FORM
        ================================== */}

        {/* 
          Allow the user to set or update
          their monthly income.
        */}
        <IncomeForm
          setMonthlyIncome={setMonthlyIncome}
          currentIncome={monthlyIncome}
        />


        {/* ==================================
            EXPENSE FORM
        ================================== */}

        {/* 
          ExpenseForm receives setExpenses
          as a prop.

          This allows ExpenseForm to add new
          expenses to the expenses state.
        */}
        <ExpenseForm
          setExpenses={setExpenses}
        />


        {/* ==================================
            EXPENSE LIST
        ================================== */}

        {/* 
          Pass expenses to ExpenseList.

          ExpenseList displays every expense
          on the screen.

          onDelete allows ExpenseList to tell
          App which expense should be deleted.
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