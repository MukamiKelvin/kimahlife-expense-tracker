// ExpenseItem represents ONE expense.
//
// onDelete = function used to delete the expense.
// onEdit = function used to edit the expense.
function ExpenseItem({
  expense,
  onDelete,
  onEdit,
}) {


  // Create a nicely formatted date.
  const formattedDate =
    new Date(expense.date).toLocaleDateString(
      "en-GB",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );


  return (

    <div className="expense-item">


      {/* ==================================
          EXPENSE INFORMATION
      ================================== */}

      <div className="expense-main">


        {/* Category icon */}
        <div className="expense-category-icon">

          {expense.category === "Food"
            ? "🍔"
            : expense.category === "Transport"
            ? "🚌"
            : expense.category === "Rent"
            ? "🏠"
            : expense.category === "Shopping"
            ? "🛍️"
            : expense.category === "Entertainment"
            ? "🎬"
            : "📌"}

        </div>


        {/* Name and category */}
        <div className="expense-details">

          <h3>
            {expense.name}
          </h3>

          <div className="expense-meta">

            <span className="category-badge">
              {expense.category}
            </span>

            <span className="expense-date">
              {formattedDate}
            </span>

          </div>

        </div>

      </div>


      {/* ==================================
          AMOUNT + ACTIONS
      ================================== */}

      <div className="expense-right">


        {/* Expense amount */}
        <strong className="expense-amount">

          KSh{" "}
          {expense.amount.toLocaleString()}

        </strong>


        {/* Action buttons */}
        <div className="expense-actions">

          <button
            className="edit-button"
            onClick={() =>
              onEdit(expense.id)
            }
          >
            Edit
          </button>


          <button
            className="delete-button"
            onClick={() =>
              onDelete(expense.id)
            }
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}


// Export ExpenseItem.
export default ExpenseItem;