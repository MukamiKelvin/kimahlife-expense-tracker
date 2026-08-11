// Import useState from React.
// useState allows our component to remember information.
import { useState } from "react";

// ExpenseForm collects information about
// a new expense from the user.
//
// setExpenses is received from App.jsx as a prop.
// We will use it to add the new expense to the
// main expenses array.
function ExpenseForm({ setExpenses }) {

  // Store the name of the expense.
  // Example: "Lunch"
  const [name, setName] = useState("");

  // Store the amount of the expense.
  // Example: "500"
  const [amount, setAmount] = useState("");

  // Store the selected category.
  // Food is our default category.
  const [category, setCategory] = useState("Food");


  // This function runs when the user submits the form.
  function handleSubmit(event) {

    // Prevent the browser from refreshing the page.
    event.preventDefault();

    // Create an object representing the new expense.
    const newExpense = {

      // Create a unique ID using the current time.
      id: Date.now(),

      // Store the expense name.
      name: name,

      // Convert the amount from text into a number.
      amount: Number(amount),

      // Store the selected category.
      category: category,
    };

    // Add the new expense to the expenses array.
    //
    // previousExpenses represents all expenses
    // that were already added.
    setExpenses((previousExpenses) => [
      ...previousExpenses,
      newExpense,
    ]);

    // Show the newly created expense in the
    // browser console so we can confirm it works.
    console.log(newExpense);
  }


  return (
    <div>

      {/* Form heading */}
      <h2>Add Expense</h2>

      {/* 
        When the user submits this form,
        React will run handleSubmit().
      */}
      <form onSubmit={handleSubmit}>

        {/* Expense name */}
        <div>
          <label>Expense Name</label>

          <input
            type="text"
            placeholder="e.g. Lunch"

            // Connect the input to our name state.
            value={name}

            // Update name whenever the user types.
            onChange={(event) =>
              setName(event.target.value)
            }
          />
        </div>


        {/* Expense amount */}
        <div>
          <label>Amount</label>

          <input
            type="number"
            placeholder="e.g. 500"

            // Connect the input to our amount state.
            value={amount}

            // Update amount whenever the user types.
            onChange={(event) =>
              setAmount(event.target.value)
            }
          />
        </div>


        {/* Expense category */}
        <div>
          <label>Category</label>

          <select
            // Connect the select element to category state.
            value={category}

            // Update category when the user selects
            // a different option.
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


        {/* Submit button */}
        <button type="submit">
          Add Expense
        </button>

      </form>

    </div>
  );
}


// Export ExpenseForm so App.jsx can use it.
export default ExpenseForm;