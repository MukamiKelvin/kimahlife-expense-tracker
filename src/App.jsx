// Import useState and useEffect from React.
//
// useState allows our component to remember information.
// useEffect allows us to run code when something changes.
import { useState, useEffect } from "react";


// Import our main CSS file.
import "./App.css";


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

  // Store the ID of the expense being edited.
  //
  // null means we are not currently editing.
  const [editingExpenseId, setEditingExpenseId] =
    useState(null);



  // ==========================================
  // MONTHLY INCOME STATE
  // ==========================================

  // Load saved monthly income from localStorage.
  const [monthlyIncome, setMonthlyIncome] = useState(() => {

    const savedIncome =
      localStorage.getItem("kimSpendIncome");

    if (savedIncome) {
      return Number(savedIncome);
    }

    // Default monthly income.
    return 31000;
  });



  // ==========================================
  // SAVE MONTHLY INCOME
  // ==========================================

  // Save the income whenever it changes.
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

  // Remember the selected month after refresh.
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


  // Create a Date representing the previous month.
  const previousMonthDate =
    new Date(currentMonthDate);


  previousMonthDate.setMonth(
    previousMonthDate.getMonth() - 1
  );


  // Convert the previous month back into YYYY-MM.
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

  // Get expenses belonging to the previous month.
  const previousMonthExpenses =
    expenses.filter(
      (expense) =>
        expense.date.startsWith(previousMonth)
    );



  // ==========================================
  // MONTHLY TOTAL
  // ==========================================

  // Calculate total spending for the selected month.
  const monthlyTotal =
    monthlyExpenses.reduce(
      (total, expense) =>
        total + expense.amount,
      0
    );



  // ==========================================
  // INCOME USAGE PERCENTAGE
  // ==========================================

  // Calculate what percentage of the selected
  // month's income has already been spent.
  //
  // Example:
  // Income = 31,000
  // Spending = 18,500
  // Usage = 59.7%
  const incomeUsagePercentage =
    monthlyIncome > 0
      ? (monthlyTotal / monthlyIncome) * 100
      : 0;



  // ==========================================
  // INCOME USAGE WIDTH
  // ==========================================

  // Limit the progress bar to 100%.
  //
  // This prevents the bar from becoming wider
  // than the card when spending exceeds income.
  const incomeUsageWidth =
    Math.min(
      incomeUsagePercentage,
      100
    );



  // ==========================================
  // INCOME USAGE STATUS
  // ==========================================

  // Decide which warning level to display.
  const incomeUsageStatus =
    incomeUsagePercentage > 100
      ? "danger"
      : incomeUsagePercentage > 80
      ? "warning"
      : "healthy";



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

  // Compare this month with the previous month.
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

  // Calculate how much was spent in each category.
  const categoryTotals =
    monthlyExpenses.reduce(
      (totals, expense) => {

        const category = expense.category;


        // Create the category if it doesn't exist.
        if (!totals[category]) {
          totals[category] = 0;
        }


        // Add the expense to the category.
        totals[category] += expense.amount;


        return totals;
      },
      {}
    );



  // ==========================================
  // CATEGORY ENTRIES
  // ==========================================

  // Convert categoryTotals into an array.
  //
  // Example:
  //
  // {
  //   Food: 5000,
  //   Shopping: 8000
  // }
  //
  // becomes:
  //
  // [
  //   ["Food", 5000],
  //   ["Shopping", 8000]
  // ]
  //
  // IMPORTANT:
  // This is declared ONLY ONCE.
  const categoryEntries =
    Object.entries(categoryTotals);



  // ==========================================
  // HIGHEST SPENDING CATEGORY
  // ==========================================

  // Find the category where the user
  // spent the most money.
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

  // Calculate total spending across
  // all recorded expenses.
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
  // DEFICIT CHECK
  // ==========================================

  const hasDeficit =
    balance < 0;



  // ==========================================
  // START EDITING
  // ==========================================

  function handleEdit(expenseId) {

    setEditingExpenseId(expenseId);

    console.log(
      "Editing expense:",
      expenseId
    );
  }



  // ==========================================
  // UPDATE EXPENSE
  // ==========================================

  function handleUpdate(updatedExpense) {

    setExpenses(
      (previousExpenses) =>

        previousExpenses.map(
          (expense) => {

            if (
              expense.id ===
              updatedExpense.id
            ) {
              return updatedExpense;
            }

            return expense;
          }
        )
    );


    // Exit editing mode.
    setEditingExpenseId(null);


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

    <div className="app">


      {/* ==================================
          NAVIGATION
      ================================== */}

      <Navbar />



      {/* ==================================
          MAIN DASHBOARD
      ================================== */}

      <main
  className="dashboard"
  id="dashboard"
>


        {/* ==================================
            DASHBOARD HEADER
        ================================== */}

        <header className="dashboard-header">

          <div>

            <h1>
              Financial Dashboard
            </h1>

            <p>
              Understand where your money goes.
            </p>

          </div>

        </header>



        {/* ==================================
            FINANCIAL SUMMARY
        ================================== */}

        <section className="summary-grid">


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
            amount={`KSh ${Math.abs(
              balance
            ).toLocaleString()}`}
          />

        </section>



        {/* ==================================
            INCOME USAGE
        ================================== */}

        <section className="analytics-grid">


          <div className="income-usage-card">


            {/* Card heading */}

            <div className="analytics-card-header">

              <div>

                <p className="form-eyebrow">
                  INCOME USAGE
                </p>

                <h2>
                  Spending Progress
                </h2>

              </div>


              {/* Percentage */}

              <strong
                className={`usage-percentage ${incomeUsageStatus}`}
              >
                {incomeUsagePercentage.toFixed(1)}%
              </strong>

            </div>



            {/* Spending information */}

            <div className="usage-information">

              <span>
                KSh {monthlyTotal.toLocaleString()} spent
              </span>

              <span>
                KSh {monthlyIncome.toLocaleString()} income
              </span>

            </div>



            {/* Progress bar */}

            <div className="progress-bar">

              <div
                className={`progress-fill ${incomeUsageStatus}`}
                style={{
                  width: `${incomeUsageWidth}%`,
                }}
              ></div>

            </div>



            {/* Status message */}

            <p
              className={`usage-message ${incomeUsageStatus}`}
            >

              {incomeUsagePercentage > 100
                ? "You have exceeded your monthly income."
                : incomeUsagePercentage > 80
                ? "Your spending is getting high. Watch your remaining balance."
                : "Your spending is currently within a healthy range."
              }

            </p>


          </div>

        </section>



        {/* ==================================
    MONTHLY OVERVIEW
================================== */}

<section className="dashboard-section monthly-overview" id="analytics">

  {/* Section heading */}
  <div className="section-header">

    <div>
      <p className="form-eyebrow">
        MONTHLY ANALYSIS
      </p>

      <h2>
        Monthly Overview
      </h2>

      <p className="section-description">
        Track your spending and remaining balance for the selected month.
      </p>
    </div>

    {/* Month selector */}
    <div className="month-selector">

      <label htmlFor="month">
        Select Month
      </label>

      <input
        id="month"
        type="month"
        value={selectedMonth}
        onChange={(event) =>
          setSelectedMonth(event.target.value)
        }
      />

    </div>

  </div>


  {/* Monthly statistics */}

  <div className="monthly-stats">

    {/* Selected month */}

    <div className="monthly-stat">

      <span className="stat-label">
        Selected Month
      </span>

      <strong>
        {new Date(
          `${selectedMonth}-01`
        ).toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        })}
      </strong>

    </div>


    {/* Monthly spending */}

    <div className="monthly-stat">

      <span className="stat-label">
        Monthly Spending
      </span>

      <strong>
        KSh {monthlyTotal.toLocaleString()}
      </strong>

    </div>


    {/* Monthly balance */}

    <div
      className={`monthly-stat ${
        monthlyBalance < 0
          ? "stat-danger"
          : "stat-positive"
      }`}
    >

      <span className="stat-label">
        Remaining Balance
      </span>

      <strong>
        KSh {monthlyBalance.toLocaleString()}
      </strong>

    </div>

  </div>

</section>



        {/* ==================================
            INCOME INSIGHT
        ================================== */}

        <section className="dashboard-section">


          <h2>
            Income Insight
          </h2>



          {incomeUsagePercentage > 100 ? (

            <p>
              🔴 You have spent more than
              your monthly income.
            </p>

          ) : incomeUsagePercentage > 80 ? (

            <p>
              🚨 You have used more than
              80% of your monthly income.
            </p>

          ) : incomeUsagePercentage > 50 ? (

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

<section className="dashboard-section monthly-comparison">

  {/* Section header */}
  <div className="section-header">

    <div>

      <p className="form-eyebrow">
        SPENDING TREND
      </p>

      <h2>
        Monthly Comparison
      </h2>

      <p className="section-description">
        Compare your spending with the previous month.
      </p>

    </div>

  </div>


  {/* Comparison statistics */}

  <div className="comparison-grid">

    {/* Previous month */}

    <div className="comparison-stat">

      <span className="stat-label">
        Previous Month
      </span>

      <strong>
        KSh {previousMonthTotal.toLocaleString()}
      </strong>

    </div>


    {/* Current month */}

    <div className="comparison-stat">

      <span className="stat-label">
        Current Month
      </span>

      <strong>
        KSh {monthlyTotal.toLocaleString()}
      </strong>

    </div>


    {/* Difference */}

    <div
      className={`comparison-stat ${
        spendingDifference > 0
          ? "comparison-danger"
          : spendingDifference < 0
          ? "comparison-positive"
          : ""
      }`}
    >

      <span className="stat-label">
        Difference
      </span>

      <strong>

        {spendingDifference > 0
          ? "+"
          : spendingDifference < 0
          ? "-"
          : ""}

        KSh{" "}
        {Math.abs(
          spendingDifference
        ).toLocaleString()}

      </strong>

    </div>


    {/* Percentage change */}

    <div
      className={`comparison-stat ${
        spendingDifference > 0
          ? "comparison-danger"
          : spendingDifference < 0
          ? "comparison-positive"
          : ""
      }`}
    >

      <span className="stat-label">
        Percentage Change
      </span>

      <strong>

        {spendingPercentageChange > 0
          ? "+"
          : spendingPercentageChange < 0
          ? "-"
          : ""}

        {Math.abs(
          spendingPercentageChange
        ).toFixed(1)}%

      </strong>

    </div>

  </div>


  {/* Comparison insight */}

  <div className="comparison-insight">

    {previousMonthTotal === 0 ? (

      <p className="comparison-neutral">
        ℹ️ There is no spending data for the
        previous month yet.
      </p>

    ) : spendingDifference > 0 ? (

      <p className="comparison-danger-text">
        📈 You spent{" "}
        {Math.abs(
          spendingPercentageChange
        ).toFixed(1)}%
        more this month than last month.
      </p>

    ) : spendingDifference < 0 ? (

      <p className="comparison-positive-text">
        📉 You spent{" "}
        {Math.abs(
          spendingPercentageChange
        ).toFixed(1)}%
        less this month than last month.
      </p>

    ) : (

      <p className="comparison-neutral">
        ➖ Your spending is the same as last month.
      </p>

    )}

  </div>

</section>



       {/* ==================================
    CATEGORY ANALYSIS
================================== */}

<section className="dashboard-section category-analysis">

  {/* Section header */}
  <div className="section-header">

    <div>

      <p className="form-eyebrow">
        SPENDING BREAKDOWN
      </p>

      <h2>
        Spending by Category
      </h2>

      <p className="section-description">
        See where most of your money is going this month.
      </p>

    </div>

  </div>


  {/* Category cards */}

  {categoryEntries.length > 0 ? (

    <div className="category-grid">

      {categoryEntries.map(
        ([category, total]) => {

          // Percentage of monthly spending.
          const spendingPercentage =
            monthlyTotal > 0
              ? (total / monthlyTotal) * 100
              : 0;


          // Percentage of monthly income.
          const incomePercentage =
            monthlyIncome > 0
              ? (total / monthlyIncome) * 100
              : 0;


          return (

            <div
              className="category-card"
              key={category}
            >

              {/* Category heading */}

              <div className="category-card-header">

                <div>

                  <span className="category-name">
                    {category}
                  </span>

                  <span className="category-amount">
                    KSh {total.toLocaleString()}
                  </span>

                </div>

                <strong>
                  {spendingPercentage.toFixed(1)}%
                </strong>

              </div>


              {/* Spending progress */}

              <div className="category-progress">

                <div
                  className="category-progress-fill"
                  style={{
                    width: `${spendingPercentage}%`,
                  }}
                ></div>

              </div>


              {/* Category information */}

              <div className="category-card-footer">

                <span>
                  {spendingPercentage.toFixed(1)}%
                  of spending
                </span>

                <span>
                  {incomePercentage.toFixed(1)}%
                  of income
                </span>

              </div>

            </div>

          );
        }
      )}

    </div>

  ) : (

    /* Empty category state */

    <div className="category-empty">

      <div className="category-empty-icon">
        —
      </div>

      <h3>
        No spending yet
      </h3>

      <p>
        Add an expense to see your spending
        breakdown by category.
      </p>

    </div>

  )}

</section>



        {/* ==================================
            SPENDING CHART
        ================================== */}

        <section className="dashboard-section">


          <SpendingChart
            categoryTotals={
              categoryTotals
            }
          />


        </section>



        {/* ==================================
    FINANCIAL INSIGHT
================================== */}

<section className="dashboard-section financial-insight">

  {/* Insight header */}
  <div className="financial-insight-header">

    <div>
      <p className="form-eyebrow">
        SMART INSIGHT
      </p>

      <h2>
        Financial Insight
      </h2>
    </div>

    <div className="insight-icon">
      💡
    </div>

  </div>


  {/* Main insight */}

  <div className="insight-main">

    <p>
      Your highest spending category
      this month is
    </p>

    <h3>
      {highestCategory[0]}
    </h3>

    <strong className="insight-amount">
      KSh {highestCategory[1].toLocaleString()}
    </strong>

    <p className="insight-percentage">

      {monthlyTotal > 0
        ? (
            (highestCategory[1] /
              monthlyTotal) *
            100
          ).toFixed(1)
        : 0
      }%

      {" "}of your monthly spending

    </p>

  </div>


  {/* Insight message */}

  <div className="insight-message">

    {highestCategory[1] === 0 ? (

      <p>
        📝 Start recording your expenses
        and KimSpend will generate
        personalized insights for you.
      </p>

    ) : highestCategory[1] >
      monthlyIncome * 0.3 ? (

      <p>
        ⚠️ <strong>
          {highestCategory[0]}
        </strong>{" "}
        is taking up a significant
        portion of your income.
        Consider reviewing this category.
      </p>

    ) : highestCategory[1] >
      monthlyIncome * 0.2 ? (

      <p>
        💡 Your{" "}
        <strong>
          {highestCategory[0]}
        </strong>{" "}
        spending is worth monitoring.
        It represents a noticeable part
        of your monthly income.
      </p>

    ) : (

      <p>
        ✅ Your highest spending category
        is currently within a reasonable
        portion of your income.
      </p>

    )}

  </div>


  {/* Financial stats */}

  <div className="insight-stats">

    <div className="insight-stat">

      <span>
        Category Spending
      </span>

      <strong>
        KSh {highestCategory[1].toLocaleString()}
      </strong>

    </div>


    <div className="insight-stat">

      <span>
        Monthly Spending
      </span>

      <strong>
        KSh {monthlyTotal.toLocaleString()}
      </strong>

    </div>


    <div className="insight-stat">

      <span>
        Remaining Income
      </span>

      <strong>
        KSh {Math.max(
          monthlyBalance,
          0
        ).toLocaleString()}
      </strong>

    </div>

  </div>

</section>



        {/* ==================================
            INCOME FORM
        ================================== */}

        <section className="dashboard-section">


          <IncomeForm
            setMonthlyIncome={
              setMonthlyIncome
            }

            currentIncome={
              monthlyIncome
            }
          />


        </section>



        {/* ==================================
            EXPENSE FORM
        ================================== */}

        <section className="dashboard-section" id="expenses">


          <ExpenseForm

            // Used when adding a new expense.
            setExpenses={
              setExpenses
            }


            // Find the expense currently
            // being edited.
            editingExpense={
              expenses.find(
                (expense) =>
                  expense.id ===
                  editingExpenseId
              )
            }


            // Function used to update
            // an existing expense.
            onUpdate={
              handleUpdate
            }


            // Function used to cancel editing.
            onCancelEdit={() =>
              setEditingExpenseId(null)
            }

          />


        </section>



        {/* ==================================
            EXPENSE LIST
        ================================== */}

        <section className="dashboard-section">


          <ExpenseList

            expenses={
              expenses
            }

            onDelete={
              handleDelete
            }

            onEdit={
              handleEdit
            }

          />


        </section>



      </main>

      {/* ==================================
          FOOTER
      ================================== */}

      <footer className="footer">

        <p>
          © 2026 KimSpend. All rights reserved.
        </p>

        <p>
  Built by{" "}
  <a
    href="https://www.linkedin.com/in/kelvin-kimanthi-mukami-60bb19241/"
    target="_blank"
    rel="noopener noreferrer"
  >
    Mukami Kelvin
  </a>
</p>

      </footer>



    </div>
  );
}



// Export App so main.jsx can render it.
export default App;