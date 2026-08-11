// SpendingChart receives categoryTotals
// from App.jsx.
//
// categoryTotals contains the amount spent
// in each category.
function SpendingChart({ categoryTotals }) {

  // Convert the category totals object
  // into an array that we can loop through.
  //
  // Example:
  //
  // {
  //   Food: 5000,
  //   Rent: 8500
  // }
  //
  // becomes:
  //
  // [
  //   ["Food", 5000],
  //   ["Rent", 8500]
  // ]
  const categories = Object.entries(categoryTotals);


  return (
    <section>

      <h2>Spending Chart</h2>


      {/* 
        Loop through every category
        and create a visual bar.
      */}
      {categories.map(([category, amount]) => {

        // Find the highest spending amount.
        //
        // We use Math.max() to find the
        // largest number in our categories.
        const highestAmount = Math.max(
          ...categories.map(
            ([, amount]) => amount
          )
        );


        // Calculate the width of the bar.
        //
        // The category with the highest amount
        // will have a width of 100%.
        const barWidth =
          highestAmount > 0
            ? (amount / highestAmount) * 100
            : 0;


        return (
          <div key={category}>

            {/* Category name */}
            <p>
              <strong>{category}</strong>
            </p>


            {/* 
              The outer div represents
              the entire chart bar.
            */}
            <div
              style={{
                width: "100%",
                height: "20px",
                backgroundColor: "#e5e7eb",
              }}
            >

              {/* 
                This inner div represents
                the amount spent.
              */}
              <div
                style={{
                  width: `${barWidth}%`,
                  height: "100%",
                  backgroundColor: "#2563eb",
                }}
              >
              </div>

            </div>


            {/* Display the amount */}
            <p>
              KSh {amount.toLocaleString()}
            </p>

          </div>
        );
      })}

    </section>
  );
}


// Export the component.
export default SpendingChart;