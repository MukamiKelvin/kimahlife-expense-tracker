// Import useState from React.
// useState allows this component to remember
// the income the user types.
import { useState } from "react";


// IncomeForm allows the user to set
// or update their monthly income.
function IncomeForm({
  setMonthlyIncome,
  currentIncome,
}) {

  // Store the value currently typed
  // into the income input.
  const [income, setIncome] = useState(
    currentIncome
  );


  // Run when the form is submitted.
  function handleSubmit(event) {

    // Stop the browser from refreshing.
    event.preventDefault();


    // Convert the input from text to a number.
    const newIncome = Number(income);


    // Only update the income if
    // the amount is greater than zero.
    if (newIncome > 0) {

      setMonthlyIncome(newIncome);

    }

  }


  return (

    <div className="income-form-container">


      {/* ==================================
          FORM HEADER
      ================================== */}

      <div className="form-header">

        <div>

          <p className="form-eyebrow">
            MONTHLY INCOME
          </p>

          <h2>
            Manage Your Income
          </h2>

        </div>

      </div>


      {/* ==================================
          CURRENT INCOME
      ================================== */}

      <div className="current-income">

        <span>
          Current monthly income
        </span>

        <strong>
          KSh {currentIncome.toLocaleString()}
        </strong>

      </div>


      {/* ==================================
          INCOME FORM
      ================================== */}

      <form
        className="income-form"
        onSubmit={handleSubmit}
      >

        <div className="form-group">

          <label htmlFor="monthly-income">

            New Monthly Income

          </label>


          <div className="amount-input">

            <span>
              KSh
            </span>


            <input
              id="monthly-income"
              type="number"
              placeholder="e.g. 31000"
              value={income}
              onChange={(event) =>
                setIncome(event.target.value)
              }
              min="1"
              required
            />

          </div>

        </div>


        {/* Submit button */}

        <button
          type="submit"
          className="primary-button"
        >

          Update Income

        </button>

      </form>


    </div>

  );
}


// Export IncomeForm.
export default IncomeForm;