// Import useState from React.
// We use it to control the income input.
import { useState } from "react";

// IncomeForm allows the user to enter
// their monthly income.
function IncomeForm({ setMonthlyIncome, currentIncome }) {

  // Store whatever the user is currently
  // typing into the income input.
  const [income, setIncome] = useState("");

  // Handle the form submission.
  function handleSubmit(event) {

    // Prevent the browser from refreshing.
    event.preventDefault();

    // Convert the input from text to a number.
    const incomeNumber = Number(income);

    // Update the monthly income in App.
    setMonthlyIncome(incomeNumber);

    // Clear the input after saving.
    setIncome("");
  }

  return (
    <div>

      {/* Form heading */}
      <h2>Set Monthly Income</h2>

      <form onSubmit={handleSubmit}>

        {/* Income input */}
        <input
          type="number"
          placeholder="e.g. 31000"

          // Display the current input value.
          value={income}

          // Update income whenever the user types.
          onChange={(event) =>
            setIncome(event.target.value)
          }
        />

        {/* Submit button */}
        <button type="submit">
          Save Income
        </button>

      </form>

    </div>
  );
}

// Export the component.
export default IncomeForm;