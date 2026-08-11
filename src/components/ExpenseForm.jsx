// Import useState and useEffect from React.
//
// useState allows our component to remember information.
// useEffect allows us to run code when editingExpense changes.
import { useState, useEffect } from "react";


// ExpenseForm can perform TWO actions:
//
// 1. Add a new expense.
// 2. Edit an existing expense.
//
// setExpenses = adds a new expense.
// editingExpense = expense currently being edited.
// onUpdate = updates an existing expense.
// onCancelEdit = cancels editing mode.
function ExpenseForm({
  setExpenses,
  editingExpense,
  onUpdate,
  onCancelEdit,
}) {


  // ==========================================
  // FORM STATE
  // ==========================================

  // Store the expense name.
  const [name, setName] = useState("");


  // Store the expense amount.
  const [amount, setAmount] = useState("");


  // Store the expense category.
  const [category, setCategory] = useState("Food");


  // Store the expense date.
  const [date, setDate] = useState("");


  // Store validation error messages.
  //
  // If there is no error, this will be empty.
  const [error, setError] = useState("");


  // ==========================================
  // LOAD EXPENSE INTO FORM
  // ==========================================

  // When the user clicks Edit,
  // load the selected expense into the form.
  useEffect(() => {

    if (editingExpense) {

      // Load expense name.
      setName(editingExpense.name);

      // Load expense amount.
      setAmount(
        String(editingExpense.amount)
      );

      // Load expense category.
      setCategory(editingExpense.category);

      // Load expense date.
      setDate(editingExpense.date);

      // Remove any old error message.
      setError("");
    }

  }, [editingExpense]);


  // ==========================================
  // FORM VALIDATION
  // ==========================================

  function validateForm() {

    // Remove any previous error.
    setError("");


    // Check whether the expense name
    // is empty.
    if (name.trim() === "") {

      setError(
        "Please enter an expense name."
      );

      return false;
    }


    // Convert the amount into a number.
    const numericAmount = Number(amount);


    // Check whether the amount is empty,
    // zero, or negative.
    if (
      amount === "" ||
      numericAmount <= 0
    ) {

      setError(
        "Please enter an amount greater than KSh 0."
      );

      return false;
    }


    // Check whether a category exists.
    if (category.trim() === "") {

      setError(
        "Please select an expense category."
      );

      return false;
    }


    // Check whether a date was selected.
    if (date === "") {

      setError(
        "Please select the expense date."
      );

      return false;
    }


    // Everything is valid.
    return true;
  }


  // ==========================================
  // HANDLE FORM SUBMISSION
  // ==========================================

  function handleSubmit(event) {

    // Prevent the browser from refreshing.
    event.preventDefault();


    // Validate the form first.
    //
    // If validation fails,
    // stop the function here.
    if (!validateForm()) {
      return;
    }


    // ========================================
    // EDIT MODE
    // ========================================

    if (editingExpense) {

      // Create the updated expense.
      const updatedExpense = {

        // Keep the original ID.
        id: editingExpense.id,

        // Store the updated name.
        name: name.trim(),

        // Convert amount into a number.
        amount: Number(amount),

        // Store the category.
        category: category,

        // Store the date.
        date: date,
      };


      // Send the updated expense
      // to App.jsx.
      onUpdate(updatedExpense);


      // Exit editing mode.
      onCancelEdit();


      // Stop here because we are finished.
      return;
    }


    // ========================================
    // ADD MODE
    // ========================================

    // Create a new expense.
    const newExpense = {

      // Generate a unique ID.
      id: Date.now(),

      // Remove unnecessary spaces
      // from the expense name.
      name: name.trim(),

      // Convert amount to a number.
      amount: Number(amount),

      // Store the category.
      category: category,

      // Store the date.
      date: date,
    };


    // Add the new expense.
    setExpenses(
      (previousExpenses) => [
        ...previousExpenses,
        newExpense,
      ]
    );


    // Show the new expense in the console.
    console.log(newExpense);


    // Clear the form.
    setName("");
    setAmount("");
    setCategory("Food");
    setDate("");

    // Clear any error message.
    setError("");
  }


  // ==========================================
  // CANCEL EDITING
  // ==========================================

  function handleCancelEdit() {

    // Clear all form fields.
    setName("");
    setAmount("");
    setCategory("Food");
    setDate("");

    // Clear any error message.
    setError("");

    // Tell App.jsx to stop editing.
    onCancelEdit();
  }


  // ==========================================
  // DISPLAY FORM
  // ==========================================

  return (
    <div>

      {/* Form heading */}
      <h2>
        {editingExpense
          ? "Edit Expense"
          : "Add Expense"}
      </h2>


      {/* 
        Display an error message only
        when error contains something.
      */}
      {error && (
        <p>
          ⚠️ {error}
        </p>
      )}


      {/* Expense form */}
      <form onSubmit={handleSubmit}>


        {/* ==================================
            EXPENSE NAME
        ================================== */}

        <div>

          <label>
            Expense Name
          </label>

          <input
            type="text"
            placeholder="e.g. Lunch"

            // Connect input to name state.
            value={name}

            // Update name as user types.
            onChange={(event) =>
              setName(event.target.value)
            }
          />

        </div>


        {/* ==================================
            EXPENSE AMOUNT
        ================================== */}

        <div>

          <label>
            Amount
          </label>

          <input
            type="number"
            placeholder="e.g. 500"
            min="1"

            // Connect input to amount state.
            value={amount}

            // Update amount as user types.
            onChange={(event) =>
              setAmount(event.target.value)
            }
          />

        </div>


        {/* ==================================
            EXPENSE CATEGORY
        ================================== */}

        <div>

          <label>
            Category
          </label>

          <select
            value={category}

            onChange={(event) =>
              setCategory(event.target.value)
            }
          >

            <option>Food</option>

            <option>
              Transport
            </option>

            <option>
              Rent
            </option>

            <option>
              Shopping
            </option>

            <option>
              Entertainment
            </option>

            <option>
              Other
            </option>

          </select>

        </div>


        {/* ==================================
            EXPENSE DATE
        ================================== */}

        <div>

          <label>
            Expense Date
          </label>

          <input
            type="date"

            value={date}

            onChange={(event) =>
              setDate(event.target.value)
            }
          />

        </div>


        {/* ==================================
            BUTTONS
        ================================== */}

        <button type="submit">

          {editingExpense
            ? "Update Expense"
            : "Add Expense"}

        </button>


        {/* 
          Only show Cancel when
          we are editing.
        */}
        {editingExpense && (

          <button
            type="button"
            onClick={handleCancelEdit}
          >
            Cancel
          </button>

        )}

      </form>

    </div>
  );
}


// Export ExpenseForm.
export default ExpenseForm;