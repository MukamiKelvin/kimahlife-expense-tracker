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
  //
  // If there are no saved expenses,
  // start with an empty array.
  const [expenses, setExpenses] = useState(() => {
    // Get saved expenses from localStorage.
    const savedExpenses =
      localStorage.getItem("kimSpendExpenses");

    // If saved expenses exist...
    if (savedExpenses) {
      // Convert the saved text back into
      // a JavaScript array.
      return JSON.parse(savedExpenses);
    }

    // If nothing has been saved yet,
    // start with an empty array.
    return [];
  });

  // ==========================================
  // SAVE EXPENSES
  // ==========================================

  // Whenever expenses change,
  // save the latest expenses to localStorage.
  useEffect(() => {
    // localStorage stores information as text.
    //
    // JSON.stringify converts our JavaScript
    // array into text.
    localStorage.setItem(
      "kimSpendExpenses",
      JSON.stringify(expenses)
    );
  }, [expenses]);

  // ==========================================
  // MONTHLY INCOME STATE
  // ==========================================

  // Load previously saved monthly income.
  //
  // If there is no saved income,
  // start with KSh 31,000.
  const [monthlyIncome, setMonthlyIncome] = useState(() => {
    // Get saved income from localStorage.
    const savedIncome =
      localStorage.getItem("kimSpendIncome");

    // If saved income exists...
    if (savedIncome) {
      // Convert the saved text into a number.
      return Number(savedIncome);
    }

    // Default monthly income.
    return 31000;
  });

  // ==========================================
  // SAVE MONTHLY INCOME
  // ==========================================

  // Whenever monthly income changes,
  // save it to localStorage.
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
  //
  // Example:
  //
  // 2026-08 = August 2026
  const [selectedMonth, setSelectedMonth] = useState(() => {
    // Get the previously selected month.
    const savedMonth =
      localStorage.getItem("kimSpendMonth");

    // If a saved month exists,
    // restore it.
    if (savedMonth) {
      return savedMonth;
    }

    // Default month.
    return "2026-08";
  });

  // ==========================================
  // SAVE SELECTED MONTH
  // ==========================================

  // Whenever selectedMonth changes,
  // save it to localStorage.
  useEffect(() => {
    localStorage.setItem(
      "kimSpendMonth",
      selectedMonth
    );
  }, [selectedMonth]);

  // ==========================================
  // PREVIOUS MONTH
  // ==========================================

  // Convert the selected month into a Date object.
  const currentMonthDate =
    new Date(`${selectedMonth}-01`);

  // Create another Date object for
  // the previous month.
  const previousMonthDate =
    new Date(currentMonthDate);

  // Move the date one month backwards.
  previousMonthDate.setMonth(
    previousMonthDate.getMonth() - 1
  );

  // Convert the previous month back into
  // YYYY-MM format.
  const previousMonth =
    previousMonthDate
      .toISOString()
      .slice(0, 7);

  // ==========================================
  // MONTHLY EXPENSES
  // ==========================================

  // Get only expenses belonging to
  // the selected month.
  const monthlyExpenses = expenses.filter(
    (expense) =>
      expense.date.startsWith(selectedMonth)
  );

  // ==========================================
  // PREVIOUS MONTH EXPENSES
  // ==========================================

  // Get only expenses belonging to
  // the previous month.
  const previousMonthExpenses =
    expenses.filter(
      (expense) =>
        expense.date.startsWith(previousMonth)
    );

  // ==========================================
  // MONTHLY TOTAL
  // ==========================================

  // Calculate how much was spent
  // during the selected month.
  const monthlyTotal =
    monthlyExpenses.reduce(
      (total, expense) =>
        total + expense.amount,
      0
    );

  // ==========================================
  // PREVIOUS MONTH TOTAL
  // ==========================================

  // Calculate how much was spent during
  // the previous month.
  const previousMonthTotal =
    previousMonthExpenses.reduce(
      (total, expense) =>
        total + expense.amount,
      0
    );

  // ==========================================
  // SPENDING DIFFERENCE
  // ==========================================

  // Compare this month's spending
  // with the previous month's spending.
  const spendingDifference =
    monthlyTotal - previousMonthTotal;

  // ==========================================
  // SPENDING PERCENTAGE CHANGE
  // ==========================================

  // Calculate the percentage change
  // compared to the previous month.
  //
  // We only calculate it when the previous
  // month has some spending.
  const spendingPercentageChange =
    previousMonthTotal > 0
      ? (spendingDifference / previousMonthTotal) * 100
      : 0;

  // ==========================================
  // CATEGORY TOTALS
  // ==========================================

  // Calculate how much was spent
  // in each category.
  //
  // Example:
  //
  // {
  //   Food: 5000,
  //   Transport: 3000,
  //   Shopping: 3500
  // }
  const categoryTotals =
    monthlyExpenses.reduce(
      (totals, expense) => {
        // Get the category of the expense.
        const category = expense.category;

        // If this category doesn't exist yet,
        // create it and start at zero.
        if (!totals[category]) {
          totals[category] = 0;
        }

        // Add the expense amount
        // to that category.
        totals[category] += expense.amount;

        // Return the updated totals.
        return totals;
      },
      {}
    );

  // ==========================================
  // HIGHEST SPENDING CATEGORY
  // ==========================================

  // Convert categoryTotals into an array.
  const categoryEntries =
    Object.entries(categoryTotals);

  // Find the category with the
  // highest spending.
  const highestCategory =
    categoryEntries.reduce(
      (highest, current) => {
        // current[1] is the current amount.
        //
        // highest[1] is the highest amount
        // found so far.
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

  // Calculate total spending across
  // ALL recorded expenses.
  const totalExpenses =
    expenses.reduce(
      (total, expense) =>
        total + expense.amount,
      0
    );

  // ==========================================
  // OVERALL BALANCE
  // ==========================================

  // Calculate the overall balance.
  const balance =
    monthlyIncome - totalExpenses;

  // ==========================================
  // MONTHLY BALANCE
  // ==========================================

  // Calculate how much money remains
  // for the selected month.
  const monthlyBalance =
    monthlyIncome - monthlyTotal;

  // ==========================================
  // INCOME USAGE PERCENTAGE
  // ==========================================

  // Calculate what percentage of the
  // monthly income has been spent.
  const incomeUsedPercentage =
    monthlyIncome > 0
      ? (monthlyTotal / monthlyIncome) * 100
      : 0;

  // ==========================================
  // DEFICIT CHECK
  // ==========================================

  // Check whether spending has exceeded
  // the available income.
  const hasDeficit =
    balance < 0;

  // ==========================================
  // DELETE EXPENSE
  // ==========================================

  // Delete an expense using its ID.
  function handleDelete(expenseId) {
    // Keep every expense except
    // the one being deleted.
    setExpenses(
      (previousExpenses) =>
        previousExpenses.filter(
          (expense) =>
            expense.id !== expenseId
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

          {/* Month selector */}
          <label>
            Select Month:
          </label>

          <input
            type="month"

            // Show the selected month.
            value={selectedMonth}

            // Update the selected month
            // when the user chooses another one.
            onChange={(event) =>
              setSelectedMonth(
                event.target.value
              )
            }
          />

          {/* Display selected month */}
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
            MONTH-TO-MONTH COMPARISON
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

          {/* Comparison message */}

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
              // Calculate the percentage
              // of monthly spending.
              const spendingPercentage =
                monthlyTotal > 0
                  ? (total / monthlyTotal) * 100
                  : 0;

              // Calculate the percentage
              // of monthly income.
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
          setExpenses={
            setExpenses
          }
        />

        {/* ==================================
            EXPENSE LIST
        ================================== */}

        <ExpenseList
          expenses={expenses}
          onDelete={handleDelete}
        />
      </main>
    </div>
  );
}

// Export App so main.jsx can use it.
export default App;