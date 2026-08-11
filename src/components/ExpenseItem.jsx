// ExpenseItem represents ONE expense.
//
// Instead of displaying all expenses,
// this component is responsible for displaying
// a single expense.
function ExpenseItem({ expense }) {

  return (
    <div>

      {/* Expense name */}
      <h3>{expense.name}</h3>

      {/* Expense amount */}
      <p>KSh {expense.amount}</p>

      {/* Expense category */}
      <p>{expense.category}</p>

    </div>
  );
}

// Export the component.
export default ExpenseItem;