import { useLoanStore } from "@lib/store";
import {
  Chart,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";

Chart.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function Reports() {
  const items = useLoanStore((s) => s.transactions);

  // Totals
  const totalLoan = items.filter(x => x.type === "loan").reduce((s, x) => s + Number(x.amount), 0);
  const totalLend = items.filter(x => x.type === "lend").reduce((s, x) => s + Number(x.amount), 0);
  const totalIncome = items.filter(x => x.type === "income").reduce((s, x) => s + Number(x.amount), 0);
  const totalExpense = items.filter(x => x.type === "expense").reduce((s, x) => s + Number(x.amount), 0);

  const balance = totalIncome - totalExpense + totalLend - totalLoan;

  // Pie chart (Income vs Expense)
  const pieData = {
    labels: ["Loan", "Lend", "Income", "Expense"],
    datasets: [
      {
        data: [totalLoan, totalLend, totalIncome, totalExpense],
        backgroundColor: ["#EF4444", "#22C55E", "#3B82F6", "#F97316"],
        borderWidth: 0,
      },
    ],
  };

  const barData = {
    labels: ["Loan", "Lend", "Income", "Expense", "Net Balance"],
    datasets: [
      {
        label: "৳ Amount",
        data: [totalLoan, totalLend, totalIncome, totalExpense, balance],
        backgroundColor: ["#EF4444", "#22C55E", "#3B82F6", "#F97316", "#4F46E5"],
      },
    ],
  };

  return (
    <div className="min-h-screen px-6 pt-10 pb-24">
      <h1 className="text-4xl font-bold mb-6">Reports</h1>

      <div className="grid gap-5">
        <div className="report-card">
          <p>Total Loan</p>
          <h2>৳{totalLoan}</h2>
        </div>

        <div className="report-card">
          <p>Total Lend</p>
          <h2>৳{totalLend}</h2>
        </div>

        <div className="report-card">
          <p>Total Income</p>
          <h2>৳{totalIncome}</h2>
        </div>

        <div className="report-card">
          <p>Total Expense</p>
          <h2>৳{totalExpense}</h2>
        </div>

        <div className="report-card">
          <p>Net Balance</p>
          <h2 className={`${balance >= 0 ? "text-green-500" : "text-red-500"}`}>
            ৳{balance}
          </h2>
        </div>
      </div>

      <div className="mt-8 grid gap-6">
        <div className="chart-card">
          <h3>Overview Pie</h3>
          <Doughnut data={pieData} />
        </div>

        <div className="chart-card">
          <h3>Totals Bar</h3>
          <Bar data={barData} />
        </div>
      </div>
    </div>
  );
}
