// Import ExpenseItem.
import ExpenseItem from "./ExpenseItem";

// ExpenseList displays all expenses.
function ExpenseList({ expenses }) {

  return (
    <div>

      {/* Section heading */}
      <h2>Recent Expenses</h2>

      {/* 
        Loop through every expense.

        For every expense, create an ExpenseItem.
      */}
      <div>

        {expenses.map((expense) => (

          <ExpenseItem
            key={expense.id}
            expense={expense}
          />

        ))}

      </div>

    </div>
  );
}

// Export ExpenseList.
export default ExpenseList;