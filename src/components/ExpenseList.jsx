// Import ExpenseItem.
// ExpenseItem displays one individual expense.
import ExpenseItem from "./ExpenseItem";


// ExpenseList displays all recorded expenses.
//
// expenses = our array of expenses.
// onDelete = function used to delete an expense.
// onEdit = function used to edit an expense.
function ExpenseList({
  expenses,
  onDelete,
  onEdit,
}) {

  return (

    <div className="expense-list-container">


      {/* ==================================
          LIST HEADER
      ================================== */}

      <div className="expense-list-header">

        <div>

          <p className="form-eyebrow">
            TRANSACTIONS
          </p>

          <h2>
            Recent Expenses
          </h2>

        </div>


        {/* Show number of transactions */}
        <span className="expense-count">

          {expenses.length}

          {expenses.length === 1
            ? " transaction"
            : " transactions"}

        </span>

      </div>


      {/* ==================================
          EXPENSE LIST
      ================================== */}

      {expenses.length > 0 ? (

        <div className="expense-items">

          {expenses.map((expense) => (

            <ExpenseItem
              key={expense.id}
              expense={expense}
              onDelete={onDelete}
              onEdit={onEdit}
            />

          ))}

        </div>

      ) : (

        /* ==================================
           EMPTY STATE
        ================================== */

        <div className="empty-expenses">

          <div className="empty-icon">
            ₵
          </div>

          <h3>
            No expenses yet
          </h3>

          <p>
            Start tracking your spending
            by adding your first expense.
          </p>

        </div>

      )}

    </div>
  );
}


// Export ExpenseList.
export default ExpenseList;