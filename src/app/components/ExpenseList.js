"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ExpenseList() {
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await fetch(
          "https://expense-tracker-server-dusky-six.vercel.app/expenses"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch expenses");
        }
        const data = await response.json();
        setExpenses(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `https://expense-tracker-server-dusky-six.vercel.app/expenses/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete expense");
      }

      // Refresh the list
      router.refresh();
      setExpenses(expenses.filter((expense) => expense._id !== id));
    } catch (err) {
      console.error("Error:", err);
    }
  };

  if (isLoading) return <p>Loading expenses...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="overflow-x-auto">
      {expenses.length === 0 ? (
        <p>No expenses found. Add your first expense!</p>
      ) : (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {expenses.map((expense) => (
              <tr key={expense._id}>
                <td className="px-6 py-4 whitespace-nowrap">{expense.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  ${expense.amount.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${
                      expense.category === "Food"
                        ? "bg-green-100 text-green-800"
                        : expense.category === "Transport"
                        ? "bg-blue-100 text-blue-800"
                        : expense.category === "Shopping"
                        ? "bg-purple-100 text-purple-800"
                        : expense.category === "Entertainment"
                        ? "bg-yellow-100 text-yellow-800"
                        : expense.category === "Utilities"
                        ? "bg-indigo-100 text-indigo-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {expense.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(expense.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleDelete(expense._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
