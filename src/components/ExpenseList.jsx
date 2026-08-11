// Import ExpenseItem.
// ExpenseItem is responsible for displaying
// one individual expense.
import ExpenseItem from "./ExpenseItem";

// ExpenseList displays all expenses.
//
// expenses = our list of expenses.
// onDelete = function used to delete an expense.
function ExpenseList({ expenses, onDelete }) {

  return (
    <div>

      {/* Section heading */}
      <h2>Recent Expenses</h2>

      {/* 
        Check whether we have any expenses.
        
        If there are expenses, display them.
        Otherwise, display a message.
      */}
      {expenses.length > 0 ? (

        <div>

          {/* 
            map() goes through every expense
            and creates an ExpenseItem.
          */}
          {expenses.map((expense) => (

            <ExpenseItem
              key={expense.id}
              expense={expense}
              onDelete={onDelete}
            />

          ))}

        </div>

      ) : (

        // This appears when there are no expenses.
        <p>No expenses recorded yet.</p>

      )}

    </div>
  );
}

// Export ExpenseList.
export default ExpenseList;