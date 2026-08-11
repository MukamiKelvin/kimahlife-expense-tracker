// Import useState from React.
import { useState } from "react";


// ExpenseForm collects information about
// a new expense from the user.
//
// It can also be used to edit an existing expense.
function ExpenseForm({
  setExpenses,
  editingExpense,
  onUpdate,
  onCancelEdit,
}) {

  // Store the expense name.
  const [name, setName] = useState(
    editingExpense ? editingExpense.name : ""
  );

  // Store the expense amount.
  const [amount, setAmount] = useState(
    editingExpense ? editingExpense.amount : ""
  );

  // Store the selected category.
  const [category, setCategory] = useState(
    editingExpense
      ? editingExpense.category
      : "Food"
  );

  // Store the expense date.
  const [date, setDate] = useState(
    editingExpense ? editingExpense.date : ""
  );


  // Run whenever the form is submitted.
  function handleSubmit(event) {

    // Prevent the browser from refreshing.
    event.preventDefault();


    // Create an expense object.
    const expenseData = {

      // Keep the existing ID when editing.
      id: editingExpense
        ? editingExpense.id
        : Date.now(),

      // Store the expense name.
      name: name,

      // Convert amount to a number.
      amount: Number(amount),

      // Store category.
      category: category,

      // Store date.
      date: date,
    };


    // If we are editing an expense...
    if (editingExpense) {

      // Send the updated expense
      // back to App.jsx.
      onUpdate(expenseData);

    } else {

      // Otherwise, create a new expense.
      setExpenses((previousExpenses) => [

        ...previousExpenses,

        expenseData,

      ]);
    }


    // Clear the form.
    setName("");
    setAmount("");
    setCategory("Food");
    setDate("");
  }


  return (

    <div className="expense-form-container">


      {/* Form header */}
      <div className="form-header">

        <div>

          <p className="form-eyebrow">
            {editingExpense
              ? "UPDATE EXPENSE"
              : "NEW TRANSACTION"}
          </p>

          <h2>
            {editingExpense
              ? "Edit Expense"
              : "Add Expense"}
          </h2>

        </div>

      </div>


      {/* Expense form */}
      <form
        className="expense-form"
        onSubmit={handleSubmit}
      >


        {/* Expense name */}
        <div className="form-group">

          <label htmlFor="expense-name">
            Expense Name
          </label>

          <input
            id="expense-name"
            type="text"
            placeholder="e.g. Lunch"
            value={name}
            onChange={(event) =>
              setName(event.target.value)
            }
            required
          />

        </div>


        {/* Expense amount */}
        <div className="form-group">

          <label htmlFor="expense-amount">
            Amount
          </label>

          <div className="amount-input">

            <span>
              KSh
            </span>

            <input
              id="expense-amount"
              type="number"
              placeholder="e.g. 500"
              value={amount}
              onChange={(event) =>
                setAmount(event.target.value)
              }
              min="0"
              required
            />

          </div>

        </div>


        {/* Expense category */}
        <div className="form-group">

          <label htmlFor="expense-category">
            Category
          </label>

          <select
            id="expense-category"
            value={category}
            onChange={(event) =>
              setCategory(event.target.value)
            }
          >

            <option>Food</option>

            <option>Transport</option>

            <option>Rent</option>

            <option>Shopping</option>

            <option>Entertainment</option>

            <option>Other</option>

          </select>

        </div>


        {/* Expense date */}
        <div className="form-group">

          <label htmlFor="expense-date">
            Expense Date
          </label>

          <input
            id="expense-date"
            type="date"
            value={date}
            onChange={(event) =>
              setDate(event.target.value)
            }
            required
          />

        </div>


        {/* Form buttons */}
        <div className="form-actions">

          <button
            type="submit"
            className="primary-button"
          >

            {editingExpense
              ? "Update Expense"
              : "Add Expense"}

          </button>


          {/* Show cancel button only
              when editing. */}
          {editingExpense && (

            <button
              type="button"
              className="secondary-button"
              onClick={() => {

                setName("");
                setAmount("");
                setCategory("Food");
                setDate("");

                onCancelEdit();

              }}
            >

              Cancel

            </button>

          )}

        </div>

      </form>

    </div>
  );
}


// Export ExpenseForm.
export default ExpenseForm;