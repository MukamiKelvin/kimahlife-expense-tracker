// Import useState and useEffect from React.
//
// useState allows our component to remember information.
// useEffect allows us to run code when something changes.
import { useState, useEffect } from "react";

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

// Import the SpendingChart component.
import SpendingChart from "./components/SpendingChart";


// App is the main component of KimSpend.
function App() {

  // ==========================================
  // EXPENSE STATE
  // ==========================================

  // Load previously saved expenses from localStorage.
  const [expenses, setExpenses] = useState(() => {

    const savedExpenses =
      localStorage.getItem("kimSpendExpenses");

    if (savedExpenses) {
      return JSON.parse(savedExpenses);
    }

    return [];
  });


  // ==========================================
  // SAVE EXPENSES
  // ==========================================

  // Save expenses whenever the expenses state changes.
  useEffect(() => {

    localStorage.setItem(
      "kimSpendExpenses",
      JSON.stringify(expenses)
    );

  }, [expenses]);


  // ==========================================
  // EDITING EXPENSE STATE
  // ==========================================

  // This state remembers the ID of the expense
  // that the user wants to edit.
  //
  // null means that we are NOT editing anything.
  const [editingExpenseId, setEditingExpenseId] =
    useState(null);


  // ==========================================
  // MONTHLY INCOME STATE
  // ==========================================

  // Load the user's saved monthly income.
  const [monthlyIncome, setMonthlyIncome] = useState(() => {

    const savedIncome =
      localStorage.getItem("kimSpendIncome");

    if (savedIncome) {
      return Number(savedIncome);
    }

    return 31000;
  });


  // ==========================================
  // SAVE MONTHLY INCOME
  // ==========================================

  useEffect(() => {

    localStorage.setItem(
      "kimSpendIncome",
      monthlyIncome
    );

  }, [monthlyIncome]);


  // ==========================================
  // SELECTED MONTH STATE
  // ==========================================

  // Store the month currently being analyzed.
  const [selectedMonth, setSelectedMonth] = useState(() => {

    const savedMonth =
      localStorage.getItem("kimSpendMonth");

    if (savedMonth) {
      return savedMonth;
    }

    return "2026-08";
  });


  // ==========================================
  // SAVE SELECTED MONTH
  // ==========================================

  useEffect(() => {

    localStorage.setItem(
      "kimSpendMonth",
      selectedMonth
    );

  }, [selectedMonth]);


  // ==========================================
  // PREVIOUS MONTH
  // ==========================================

  const currentMonthDate =
    new Date(`${selectedMonth}-01`);

  const previousMonthDate =
    new Date(currentMonthDate);

  previousMonthDate.setMonth(
    previousMonthDate.getMonth() - 1
  );

  const previousMonth =
    previousMonthDate
      .toISOString()
      .slice(0, 7);


  // ==========================================
  // MONTHLY EXPENSES
  // ==========================================

  const monthlyExpenses = expenses.filter(
    (expense) =>
      expense.date.startsWith(selectedMonth)
  );


  // ==========================================
  // PREVIOUS MONTH EXPENSES
  // ==========================================

  const previousMonthExpenses =
    expenses.filter(
      (expense) =>
        expense.date.startsWith(previousMonth)
    );


  // ==========================================
  // MONTHLY TOTAL
  // ==========================================

  const monthlyTotal =
    monthlyExpenses.reduce(
      (total, expense) =>
        total + expense.amount,
      0
    );


  // ==========================================
  // PREVIOUS MONTH TOTAL
  // ==========================================

  const previousMonthTotal =
    previousMonthExpenses.reduce(
      (total, expense) =>
        total + expense.amount,
      0
    );


  // ==========================================
  // SPENDING DIFFERENCE
  // ==========================================

  const spendingDifference =
    monthlyTotal - previousMonthTotal;


  // ==========================================
  // SPENDING PERCENTAGE CHANGE
  // ==========================================

  const spendingPercentageChange =
    previousMonthTotal > 0
      ? (spendingDifference / previousMonthTotal) * 100
      : 0;


  // ==========================================
  // CATEGORY TOTALS
  // ==========================================

  const categoryTotals =
    monthlyExpenses.reduce(
      (totals, expense) => {

        const category = expense.category;

        if (!totals[category]) {
          totals[category] = 0;
        }

        totals[category] += expense.amount;

        return totals;

      },
      {}
    );


  // ==========================================
  // HIGHEST SPENDING CATEGORY
  // ==========================================

  const categoryEntries =
    Object.entries(categoryTotals);

  const highestCategory =
    categoryEntries.reduce(
      (highest, current) => {

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

  const totalExpenses =
    expenses.reduce(
      (total, expense) =>
        total + expense.amount,
      0
    );


  // ==========================================
  // OVERALL BALANCE
  // ==========================================

  const balance =
    monthlyIncome - totalExpenses;


  // ==========================================
  // MONTHLY BALANCE
  // ==========================================

  const monthlyBalance =
    monthlyIncome - monthlyTotal;


  // ==========================================
  // INCOME USAGE PERCENTAGE
  // ==========================================

  const incomeUsedPercentage =
    monthlyIncome > 0
      ? (monthlyTotal / monthlyIncome) * 100
      : 0;


  // ==========================================
  // DEFICIT CHECK
  // ==========================================

  const hasDeficit =
    balance < 0;


  // ==========================================
// START EDITING
// ==========================================

// This function runs when the user clicks
// the Edit button.
//
// It remembers which expense the user
// wants to edit.
function handleEdit(expenseId) {

  // Store the expense ID in our state.
  setEditingExpenseId(expenseId);

  // Show the ID in the console.
  console.log(
    "Editing expense:",
    expenseId
  );
}

// ==========================================
// UPDATE EXPENSE
// ==========================================

// This function receives the updated expense
// from ExpenseForm.
function handleUpdate(updatedExpense) {

  // Go through all our expenses.
  setExpenses((previousExpenses) =>

    previousExpenses.map((expense) => {

      // Check whether this is the expense
      // that we are currently updating.
      if (expense.id === updatedExpense.id) {

        // Replace the old expense with
        // the updated expense.
        return updatedExpense;
      }

      // Keep every other expense unchanged.
      return expense;
    })
  );

  // Exit editing mode.
  setEditingExpenseId(null);

  // Show the updated expense in the console.
  console.log(
    "Expense updated:",
    updatedExpense
  );
}


  // ==========================================
  // DELETE EXPENSE
  // ==========================================

  function handleDelete(expenseId) {

    setExpenses(
      (previousExpenses) =>
        previousExpenses.filter(
          (expense) =>
            expense.id !== expenseId
        )
    );
  }


  // ==========================================
  // DISPLAY APPLICATION
  // ==========================================

  return (
    <div>

      {/* Display the navigation bar */}
      <Navbar />


      {/* Main content of KimSpend */}
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

          <SummaryCard
            title="Monthly Income"
            amount={`KSh ${monthlyIncome.toLocaleString()}`}
          />

          <SummaryCard
            title="Total Expenses"
            amount={`KSh ${totalExpenses.toLocaleString()}`}
          />

          <SummaryCard
            title={
              hasDeficit
                ? "Deficit"
                : "Balance"
            }
            amount={`KSh ${Math.abs(balance).toLocaleString()}`}
          />

        </section>


        {/* ==================================
            MONTHLY OVERVIEW
        ================================== */}

        <section>

          <h2>Monthly Overview</h2>

          <label>
            Select Month:
          </label>

          <input
            type="month"
            value={selectedMonth}
            onChange={(event) =>
              setSelectedMonth(
                event.target.value
              )
            }
          />

          <p>
            Selected Month: {selectedMonth}
          </p>

          <p>
            Monthly Spending: KSh{" "}
            {monthlyTotal.toLocaleString()}
          </p>

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

          <p>
            Monthly Income: KSh{" "}
            {monthlyIncome.toLocaleString()}
          </p>

          <p>
            Money Spent: KSh{" "}
            {monthlyTotal.toLocaleString()}
          </p>

          <p>
            Income Used:{" "}
            {incomeUsedPercentage.toFixed(1)}%
          </p>

          <p>
            Remaining: KSh{" "}
            {monthlyBalance.toLocaleString()}
          </p>

        </section>


        {/* ==================================
            INCOME INSIGHT
        ================================== */}

        <section>

          <h2>Income Insight</h2>

          {incomeUsedPercentage > 100 ? (

            <p>
              🔴 You have spent more than
              your monthly income.
            </p>

          ) : incomeUsedPercentage > 80 ? (

            <p>
              🚨 You have used more than
              80% of your monthly income.
            </p>

          ) : incomeUsedPercentage > 50 ? (

            <p>
              ⚠️ You have used more than
              half of your monthly income.
            </p>

          ) : (

            <p>
              ✅ Your spending is currently
              below 50% of your income.
            </p>

          )}

        </section>


        {/* ==================================
            MONTHLY COMPARISON
        ================================== */}

        <section>

          <h2>Monthly Comparison</h2>

          <p>
            Previous Month Spending:
            KSh{" "}
            {previousMonthTotal.toLocaleString()}
          </p>

          <p>
            Current Month Spending:
            KSh{" "}
            {monthlyTotal.toLocaleString()}
          </p>

          <p>
            Difference:
            KSh{" "}
            {Math.abs(
              spendingDifference
            ).toLocaleString()}
          </p>

          <p>
            Percentage Change:{" "}
            {Math.abs(
              spendingPercentageChange
            ).toFixed(1)}%
          </p>

          {previousMonthTotal === 0 ? (

            <p>
              ℹ️ There is no spending data
              for the previous month yet.
            </p>

          ) : spendingDifference > 0 ? (

            <p>
              📈 You spent{" "}
              {Math.abs(
                spendingPercentageChange
              ).toFixed(1)}%
              more this month than last month.
            </p>

          ) : spendingDifference < 0 ? (

            <p>
              📉 You spent{" "}
              {Math.abs(
                spendingPercentageChange
              ).toFixed(1)}%
              less this month than last month.
            </p>

          ) : (

            <p>
              ➖ Your spending is the same
              as last month.
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

              const spendingPercentage =
                monthlyTotal > 0
                  ? (total / monthlyTotal) * 100
                  : 0;

              const incomePercentage =
                monthlyIncome > 0
                  ? (total / monthlyIncome) * 100
                  : 0;

              return (
                <div key={category}>

                  <p>
                    <strong>
                      {category}
                    </strong>
                  </p>

                  <p>
                    KSh{" "}
                    {total.toLocaleString()}
                  </p>

                  <p>
                    {spendingPercentage.toFixed(1)}%
                    of monthly spending
                  </p>

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
            SPENDING CHART
        ================================== */}

        <SpendingChart
          categoryTotals={categoryTotals}
        />


        {/* ==================================
            FINANCIAL INSIGHT
        ================================== */}

        <section>

          <h2>
            💡 Financial Insight
          </h2>

          <p>
            Your highest spending category
            this month is:
          </p>

          <h3>
            {highestCategory[0]}
          </h3>

          <p>
            KSh{" "}
            {highestCategory[1].toLocaleString()}
          </p>

          <p>
            {monthlyTotal > 0
              ? (
                  (highestCategory[1] /
                    monthlyTotal) *
                  100
                ).toFixed(1)
              : 0
            }%
            of your monthly spending
          </p>

        </section>


        {/* ==================================
            INCOME FORM
        ================================== */}

        <IncomeForm
          setMonthlyIncome={
            setMonthlyIncome
          }
          currentIncome={
            monthlyIncome
          }
        />


        {/* ==================================
            EXPENSE FORM
        ================================== */}

       <ExpenseForm
  // Used when adding a new expense.
  setExpenses={setExpenses}

  // Find the expense currently being edited.
  editingExpense={
    expenses.find(
      (expense) =>
        expense.id === editingExpenseId
    )
  }

  // Function used by ExpenseForm
  // to update the expense.
  onUpdate={handleUpdate}

  // Function used to cancel editing.
  onCancelEdit={() =>
    setEditingExpenseId(null)
  }
/>


        {/* ==================================
            EXPENSE LIST
        ================================== */}

        <ExpenseList
          expenses={expenses}
          onDelete={handleDelete}

          // Pass our handleEdit function
          // down to ExpenseList.
          onEdit={handleEdit}
        />


        {/* ==================================
            EDITING INFORMATION
        ================================== */}

        {/* 
          This is temporary.

          We are displaying the ID of the
          expense currently being edited.

          Later, we will replace this with
          an actual edit form.
        */}
        {editingExpenseId && (
          <section>

            <h2>
              Editing Expense
            </h2>

            <p>
              Expense ID: {editingExpenseId}
            </p>

          </section>
        )}


      </main>

    </div>
  );
}


// Export App so main.jsx can use it.
export default App;