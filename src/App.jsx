// Import the Navbar component from our components folder.
import Navbar from "./components/Navbar";

// Import the SummaryCard component.
import SummaryCard from "./components/SummaryCard";

// App is the main component of our application.
function App() {
  return (
    <div>
      {/* Display our navigation bar */}
      <Navbar />

      {/* Main content of our application */}
      <main>
        <h1>Financial Dashboard</h1>

        <p>Welcome to your personal expense tracker.</p>

        {/* Container for our financial summary */}
        <section>
          {/* We can reuse the same component */}
          <SummaryCard />

          {/* Another SummaryCard */}
          <SummaryCard />

          {/* And another one */}
          <SummaryCard />
        </section>
      </main>
    </div>
  );
}

// Export App so React can use it.
export default App;