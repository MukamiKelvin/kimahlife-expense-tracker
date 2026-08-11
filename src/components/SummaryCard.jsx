// SummaryCard displays one financial
// summary on the KimSpend dashboard.
//
// Example:
// Monthly Income → KSh 31,000
// Total Expenses → KSh 3,500
// Balance → KSh 27,500

function SummaryCard({ title, amount }) {

  // Check whether this card represents
  // a deficit.
  const isDeficit = title === "Deficit";

  // Check whether this card represents
  // income.
  const isIncome = title === "Monthly Income";

  // Check whether this card represents
  // expenses.
  const isExpense = title === "Total Expenses";

  return (

    <div
      className={`summary-card ${
        isDeficit
          ? "summary-card-deficit"
          : isIncome
          ? "summary-card-income"
          : isExpense
          ? "summary-card-expense"
          : "summary-card-balance"
      }`}
    >

      {/* Small colored indicator */}
      <div className="summary-card-indicator"></div>


      {/* Card title */}
      <p className="summary-card-title">
        {title}
      </p>


      {/* Main financial amount */}
      <h2 className="summary-card-amount">
        {amount}
      </h2>


      {/* Small description */}
      <p className="summary-card-description">

        {isDeficit
          ? "You spent more than your income"
          : isIncome
          ? "Your monthly income"
          : isExpense
          ? "Your recorded spending"
          : "Money remaining after spending"}

      </p>

    </div>
  );
}


// Export SummaryCard so App.jsx
// can use it.
export default SummaryCard;