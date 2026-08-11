// SummaryCard is a reusable component.
// We can use it multiple times for things like:
// Income, Expenses and Balance.

function SummaryCard() {
  return (
    <div>
      {/* The title of the card */}
      <h3>Monthly Income</h3>

      {/* The amount */}
      <p>KSh 31,000</p>
    </div>
  );
}

// Export the component so other files can use it.
export default SummaryCard;