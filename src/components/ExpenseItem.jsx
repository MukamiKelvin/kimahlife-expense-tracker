// ExpenseItem represents ONE expense.
//
// onDelete is a function that we receive from
// the parent component. We will call this function
// when the user clicks the Delete button.
function ExpenseItem({ expense, onDelete }) {

  return (
    <div>

      {/* Expense name */}
      <h3>{expense.name}</h3>

      {/* Expense amount */}
      <p>KSh {expense.amount}</p>

      {/* Expense category */}
      <p>{expense.category}</p>

      {/* Expense date */}
      <p>
  {new Date(expense.date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })}
      </p>

      {/* 
        When the user clicks this button,
        call the onDelete function.

        We pass the expense ID so the parent
        knows exactly which expense to delete.
      */}
      <button onClick={() => onDelete(expense.id)}>
        Delete
      </button>

    </div>
  );
}

// Export the component.
export default ExpenseItem;