// SummaryCard is a reusable component.
// It receives information from its parent component
// through something called "props".
function SummaryCard({ title, amount }) {
  return (
    <div>
      {/* 
        Instead of writing "Monthly Income" directly,
        we use the title prop.

        React will replace {title} with whatever
        value we give the component.
      */}
      <h3>{title}</h3>

      {/* 
        We also use the amount prop.
        This allows every card to display a
        different financial amount.
      */}
      <p>{amount}</p>
    </div>
  );
}

// Export the component so App.jsx can use it.
export default SummaryCard;