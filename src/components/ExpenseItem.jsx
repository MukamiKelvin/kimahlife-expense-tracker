// ExpenseItem represents ONE expense.
//
// onDelete = function used to delete the expense.
// onEdit = function used to start editing the expense.
function ExpenseItem({ expense, onDelete, onEdit }) {


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
        Edit button.

        When the user clicks Edit,
        we call the onEdit function.

        We pass the expense ID so App.jsx
        knows exactly which expense the
        user wants to edit.
      */}
      <button onClick={() => onEdit(expense.id)}>
        Edit
      </button>


      {/* 
        Delete button.

        When the user clicks Delete,
        we call the onDelete function.

        We pass the expense ID so App.jsx
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