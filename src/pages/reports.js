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

  const totalLoan = items.filter(x => x.type === "loan").reduce((sum, x) => sum + Number(x.amount), 0);
  const totalLend = items.filter(x => x.type === "lend").reduce((sum, x) => sum + Number(x.amount), 0);
  const balance = totalLend - totalLoan;

  const pieData = {
    labels: ["Loan", "Lend"],
    datasets: [
      {
        data: [totalLoan, totalLend],
        backgroundColor: ["#EF4444", "#22C55E"],
        borderWidth: 0,
      },
    ],
  };

  const barData = {
    labels: ["Loan", "Lend", "Balance"],
    datasets: [
      {
        label: "৳ Amount",
        data: [totalLoan, totalLend, balance],
        backgroundColor: ["#EF4444", "#22C55E", "#4F46E5"],
      },
    ],
  };

  const chartOptions = {
    plugins: { legend: { labels: { color: "#CBD5F5" } } },
    scales: {
      x: { ticks: { color: "#94A3B8" } },
      y: { ticks: { color: "#94A3B8" } },
    },
  };

  return (
    <div className="min-h-screen px-6 pt-10 pb-24">
      <h1 className="text-4xl font-bold mb-6">Reports</h1>

      <div className="grid gap-5">
        <div className="p-5 rounded-2xl bg-white/90 dark:bg-slate-900/90 shadow-lg border border-slate-200/70 dark:border-slate-700">
          <p className="text-slate-500 mb-1">Total Loan</p>
          <h2 className="text-3xl font-bold text-danger">৳{totalLoan}</h2>
        </div>
        <div className="p-5 rounded-2xl bg-white/90 dark:bg-slate-900/90 shadow-lg border border-slate-200/70 dark:border-slate-700">
          <p className="text-slate-500 mb-1">Total Lend</p>
          <h2 className="text-3xl font-bold text-accent">৳{totalLend}</h2>
        </div>
        <div className="p-5 rounded-2xl bg-white/90 dark:bg-slate-900/90 shadow-lg border border-slate-200/70 dark:border-slate-700">
          <p className="text-slate-500 mb-1">Net Balance</p>
          <h2 className={`text-3xl font-bold ${balance >= 0 ? "text-accent" : "text-danger"}`}>
            ৳{balance}
          </h2>
        </div>
      </div>

      <div className="mt-8 grid gap-6">
        <div className="p-5 rounded-2xl bg-white/90 dark:bg-slate-900/90 shadow-lg border border-slate-200/70 dark:border-slate-700">
          <h3 className="font-semibold mb-3">Loan vs Lend</h3>
          <Doughnut data={pieData} />
        </div>

        <div className="p-5 rounded-2xl bg-white/90 dark:bg-slate-900/90 shadow-lg border border-slate-200/70 dark:border-slate-700">
          <h3 className="font-semibold mb-3">Totals Overview</h3>
          <Bar data={barData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}
