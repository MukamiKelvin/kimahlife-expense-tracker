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
  const [monthlyIncome, setMonthlyIncome] = useState(50000);


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
// PREVIOUS MONTH
// ==========================================

// Convert the selected month into a Date object.
const currentMonthDate = new Date(`${selectedMonth}-01`);

// Create a date representing the previous month.
const previousMonthDate = new Date(currentMonthDate);

previousMonthDate.setMonth(
  previousMonthDate.getMonth() - 1
);

// Convert the previous month back into
// the YYYY-MM format used by our expenses.
const previousMonth = previousMonthDate
  .toISOString()
  .slice(0, 7);


  // ==========================================
  // MONTHLY EXPENSES
  // ==========================================

  // Get only the expenses belonging to
  // the currently selected month.
  const monthlyExpenses = expenses.filter((expense) =>
    expense.date.startsWith(selectedMonth)
  );


  // ==========================================
// PREVIOUS MONTH EXPENSES
// ==========================================

// Get only the expenses belonging to
// the previous month.
const previousMonthExpenses = expenses.filter(
  (expense) =>
    expense.date.startsWith(previousMonth)
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
// PREVIOUS MONTH TOTAL
// ==========================================

// Calculate how much was spent during
// the previous month.
const previousMonthTotal = previousMonthExpenses.reduce(
  (total, expense) => total + expense.amount,
  0
);

// ==========================================
// SPENDING DIFFERENCE
// ==========================================

// Calculate the difference between this month's
// spending and the previous month's spending.
const spendingDifference =
  monthlyTotal - previousMonthTotal;

  // ==========================================
// SPENDING PERCENTAGE CHANGE
// ==========================================

// Calculate how much spending changed
// compared to the previous month.
//
// We only calculate this if the previous
// month had some spending.
const spendingPercentageChange =
  previousMonthTotal > 0
    ? (spendingDifference / previousMonthTotal) * 100
    : 0;


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
// HIGHEST SPENDING CATEGORY
// ==========================================

// Convert the category totals object into an array
// so that we can search through the categories.
//
// Example:
//
// {
//   Food: 5000,
//   Rent: 8500,
//   Transport: 3000
// }
//
// becomes:
//
// [
//   ["Food", 5000],
//   ["Rent", 8500],
//   ["Transport", 3000]
// ]

const categoryEntries = Object.entries(categoryTotals);


// Find the category with the highest spending.
const highestCategory = categoryEntries.reduce(
  (highest, current) => {

    // current[1] represents the amount spent
    // in the current category.
    //
    // highest[1] represents the amount spent
    // in the current highest category.

    if (current[1] > highest[1]) {
      return current;
    }

    return highest;
  },
  ["None", 0]
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
// INCOME USAGE
// ==========================================

// Calculate what percentage of the user's
// monthly income has already been spent.
//
// Example:
// Income = 31,000
// Spending = 15,500
//
// 15,500 / 31,000 * 100 = 50%
const incomeUsedPercentage =
  monthlyIncome > 0
    ? (monthlyTotal / monthlyIncome) * 100
    : 0;


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
          Welcome to your KimSpend financial dashboard.
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
    INCOME USAGE
================================== */}

<section>

  <h2>Income Usage</h2>

  {/* Display monthly income */}
  <p>
    Monthly Income: KSh{" "}
    {monthlyIncome.toLocaleString()}
  </p>

  {/* Display money spent */}
  <p>
    Money Spent: KSh{" "}
    {monthlyTotal.toLocaleString()}
  </p>

  {/* Display percentage of income used */}
  <p>
    Income Used:{" "}
    {incomeUsedPercentage.toFixed(1)}%
  </p>

  {/* Display remaining money */}
  <p>
    Remaining: KSh{" "}
    {monthlyBalance.toLocaleString()}
  </p>

</section>

  
  {/* ==================================
    INCOME USAGE INSIGHT
================================== */}

<section>

  <h2>Income Insight</h2>

  {incomeUsedPercentage > 100 ? (

    <p>
      🔴 You have spent more than your
      monthly income.
    </p>

  ) : incomeUsedPercentage > 80 ? (

    <p>
      🚨 You have already used more than
      80% of your monthly income.
    </p>

  ) : incomeUsedPercentage > 50 ? (

    <p>
      ⚠️ You have used more than half
      of your monthly income.
    </p>

  ) : (

    <p>
      ✅ Your spending is currently
      below 50% of your income.
    </p>

  )}

</section>

{/* ==================================
    MONTH-TO-MONTH COMPARISON
================================== */}

<section>

  <h2>Monthly Comparison</h2>

  {/* Previous month's spending */}
  <p>
    Previous Month Spending:
    KSh {previousMonthTotal.toLocaleString()}
  </p>


  {/* Current month's spending */}
  <p>
    Current Month Spending:
    KSh {monthlyTotal.toLocaleString()}
  </p>


  {/* Difference between the two months */}
  <p>
    Difference:
    KSh {Math.abs(spendingDifference).toLocaleString()}
  </p>


  {/* Display percentage change */}
  <p>
    Percentage Change:
    {Math.abs(spendingPercentageChange).toFixed(1)}%
  </p>


  {/* ==================================
      COMPARISON MESSAGE
  ================================== */}

  {previousMonthTotal === 0 ? (

    <p>
      ℹ️ There is no spending data for
      the previous month yet.
    </p>

  ) : spendingDifference > 0 ? (

    <p>
      📈 You spent{" "}
      {Math.abs(spendingPercentageChange).toFixed(1)}%
      more this month than last month.
    </p>

  ) : spendingDifference < 0 ? (

    <p>
      📉 You spent{" "}
      {Math.abs(spendingPercentageChange).toFixed(1)}%
      less this month than last month.
    </p>

  ) : (

    <p>
      ➖ Your spending is the same as last month.
    </p>

  )}

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
    FINANCIAL INSIGHT
================================== */}

<section>

  <h2>💡 Financial Insight</h2>

  <p>
    Your highest spending category this month is:
  </p>

  <h3>
    {highestCategory[0]}
  </h3>

  <p>
    KSh {highestCategory[1].toLocaleString()}
  </p>

  <p>
  {monthlyTotal > 0
    ? ((highestCategory[1] / monthlyTotal) * 100).toFixed(1)
    : 0
  }% of your monthly spending
</p>

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