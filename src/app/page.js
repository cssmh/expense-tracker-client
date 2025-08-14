import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";


export default function Home() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-center">Expense Tracker</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Add New Expense</h2>
          <ExpenseForm />
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Your Expenses</h2>
          <ExpenseList />
        </div>
      </div>
    </div>
  );
}
