// SpendingChart displays a visual breakdown
// of the user's spending by category.
//
// categoryTotals is received from App.jsx.
// Example:
//
// {
//   Food: 5000,
//   Transport: 3000,
//   Shopping: 3500
// }

function SpendingChart({ categoryTotals }) {

  // Convert the category totals object
  // into an array so we can use map().
  const categoryEntries = Object.entries(categoryTotals);

  // Calculate the total amount spent.
  const totalSpending = categoryEntries.reduce(
    (total, [, amount]) => total + amount,
    0
  );

  // Find the highest spending category.
  const highestCategory = categoryEntries.reduce(
    (highest, current) => {
      if (current[1] > highest[1]) {
        return current;
      }

      return highest;
    },
    ["None", 0]
  );

  // If there are no expenses yet,
  // show an empty state.
  if (categoryEntries.length === 0) {
    return (
      <div className="spending-chart-container">

        <div className="spending-chart-header">
          <div>
            <p className="form-eyebrow">
              SPENDING ANALYSIS
            </p>

            <h2>Spending Chart</h2>
          </div>
        </div>

        <div className="spending-chart-empty">
          <div className="empty-chart-icon">
            $
          </div>

          <h3>No spending data yet</h3>

          <p>
            Add some expenses to see your
            spending breakdown.
          </p>
        </div>

      </div>
    );
  }

  return (
    <div className="spending-chart-container">

      {/* ==================================
          CHART HEADER
      ================================== */}

      <div className="spending-chart-header">

        <div>
          <p className="form-eyebrow">
            SPENDING ANALYSIS
          </p>

          <h2>
            Spending by Category
          </h2>
        </div>

        <div className="chart-total">

          <span>Total Spent</span>

          <strong>
            KSh {totalSpending.toLocaleString()}
          </strong>

        </div>

      </div>


      {/* ==================================
          HIGHEST CATEGORY
      ================================== */}

      <div className="highest-category">

        <div className="highest-category-icon">
          ↑
        </div>

        <div>

          <span>
            Highest Spending
          </span>

          <strong>
            {highestCategory[0]}
          </strong>

        </div>

        <strong className="highest-category-amount">
          KSh {highestCategory[1].toLocaleString()}
        </strong>

      </div>


      {/* ==================================
          CATEGORY BARS
      ================================== */}

      <div className="category-chart">

        {categoryEntries.map(
          ([category, amount]) => {

            // Calculate the percentage
            // this category represents
            // of total spending.
            const percentage =
              totalSpending > 0
                ? (amount / totalSpending) * 100
                : 0;

            return (
              <div
                className="category-chart-item"
                key={category}
              >

                {/* Category information */}

                <div className="category-chart-info">

                  <div className="category-chart-name">
                    <span className="category-dot"></span>

                    <strong>
                      {category}
                    </strong>
                  </div>

                  <div className="category-chart-values">

                    <span>
                      KSh {amount.toLocaleString()}
                    </span>

                    <strong>
                      {percentage.toFixed(1)}%
                    </strong>

                  </div>

                </div>


                {/* Progress bar */}

                <div className="category-bar">

                  <div
                    className="category-bar-fill"
                    style={{
                      width: `${percentage}%`,
                    }}
                  ></div>

                </div>

              </div>
            );
          }
        )}

      </div>

    </div>
  );
}


// Export SpendingChart.
export default SpendingChart;