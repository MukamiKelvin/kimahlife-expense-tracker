// Import useState from React.
// useState allows our component to remember information.
import { useState } from "react";

// ExpenseForm collects information about
// a new expense from the user.
function ExpenseForm() {

  // Store the name of the expense.
  const [name, setName] = useState("");

  // Store the amount of the expense.
  const [amount, setAmount] = useState("");

  // Store the selected category.
  // We start with Food as the default category.
  const [category, setCategory] = useState("Food");

  return (
    <div>

      {/* Form heading */}
      <h2>Add Expense</h2>

      <form>

        {/* Expense name */}
        <div>
          <label>Expense Name</label>

          <input
            type="text"
            placeholder="e.g. Lunch"

            // Connect input to name state.
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

            // Connect input to amount state.
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
            // Connect select to category state.
            value={category}

            // Update category when selection changes.
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

// Export the component.
export default ExpenseForm;