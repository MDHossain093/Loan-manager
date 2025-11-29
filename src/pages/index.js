// src/pages/index.js
import { useLoanStore } from "@lib/store";
import {
  ArrowDownCircleIcon,
  ArrowUpCircleIcon,
  PlusCircleIcon,
  MinusCircleIcon,
  ClipboardDocumentListIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";

export default function Home() {
  const items = useLoanStore((s) => s.transactions);

  // ===== TOTALS =====
  const totalLoan = items
    .filter((x) => x.type === "loan")
    .reduce((a, b) => a + Number(b.amount), 0);

  const totalLend = items
    .filter((x) => x.type === "lend")
    .reduce((a, b) => a + Number(b.amount), 0);

  const totalIncome = items
    .filter((x) => x.type === "income")
    .reduce((a, b) => a + Number(b.amount), 0);

  const totalExpense = items
    .filter((x) => x.type === "expense")
    .reduce((a, b) => a + Number(b.amount), 0);

  const balance = totalIncome + totalLend - (totalLoan + totalExpense);

  // ===== MONTHLY SUMMARY =====
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  const thisMonth = items.filter((x) => {
    if (!x.date) return false;
    const d = new Date(x.date);
    return d.getMonth() + 1 === currentMonth && d.getFullYear() === currentYear;
  });

  const monthIncome = thisMonth
    .filter((x) => x.type === "income")
    .reduce((a, b) => a + Number(b.amount), 0);

  const monthExpense = thisMonth
    .filter((x) => x.type === "expense")
    .reduce((a, b) => a + Number(b.amount), 0);

  // ===== RECENT TRANSACTIONS =====
  const recent = [...items].slice(-5).reverse();

  return (
    <div className="min-h-screen px-6 pt-10 pb-24">
      <h1 className="text-4xl font-extrabold mb-8 tracking-tight bg-gradient-to-r from-indigo-500 to-violet-600 text-transparent bg-clip-text">
        Overview
      </h1>

      {/* ===== SUMMARY CARDS ===== */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Loan */}
        <div className="p-4 rounded-2xl bg-white/60 dark:bg-slate-900/50 backdrop-blur-xl border border-red-400/30 dark:border-red-500/30 shadow hover:scale-[1.03] transition-all">
          <div className="flex items-center gap-2 mb-1">
            <ArrowUpCircleIcon className="w-6 h-6 text-red-500" />
            <p className="text-sm text-slate-600 dark:text-slate-300">Total Loan</p>
          </div>
          <p className="text-2xl font-bold text-red-500">৳{totalLoan}</p>
        </div>

        {/* Lend */}
        <div className="p-4 rounded-2xl bg-white/60 dark:bg-slate-900/50 backdrop-blur-xl border border-green-400/30 dark:border-green-500/30 shadow hover:scale-[1.03] transition-all">
          <div className="flex items-center gap-2 mb-1">
            <ArrowDownCircleIcon className="w-6 h-6 text-green-500" />
            <p className="text-sm text-slate-600 dark:text-slate-300">Total Lend</p>
          </div>
          <p className="text-2xl font-bold text-green-500">৳{totalLend}</p>
        </div>

        {/* Income */}
        <div className="p-4 rounded-2xl bg-white/60 dark:bg-slate-900/50 backdrop-blur-xl border border-blue-400/30 dark:border-blue-500/30 shadow hover:scale-[1.03] transition-all">
          <div className="flex items-center gap-2 mb-1">
            <PlusCircleIcon className="w-6 h-6 text-blue-500" />
            <p className="text-sm text-slate-600 dark:text-slate-300">Total Income</p>
          </div>
          <p className="text-2xl font-bold text-blue-500">৳{totalIncome}</p>
        </div>

        {/* Expense */}
        <div className="p-4 rounded-2xl bg-white/60 dark:bg-slate-900/50 backdrop-blur-xl border border-orange-400/30 dark:border-orange-500/30 shadow hover:scale-[1.03] transition-all">
          <div className="flex items-center gap-2 mb-1">
            <MinusCircleIcon className="w-6 h-6 text-orange-500" />
            <p className="text-sm text-slate-600 dark:text-slate-300">Total Expense</p>
          </div>
          <p className="text-2xl font-bold text-orange-500">৳{totalExpense}</p>
        </div>

        {/* Net Balance */}
        <div className="col-span-2 p-5 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-700 text-white shadow-xl">
          <div className="flex justify-between items-center">
            <p className="text-sm opacity-90">Net Balance</p>
            <ChartBarIcon className="w-6 h-6 opacity-80" />
          </div>
          <p className="text-3xl font-extrabold mt-1">৳{balance}</p>
        </div>
      </div>

      {/* ===== THIS MONTH SUMMARY ===== */}
      <div className="p-4 mb-6 rounded-2xl bg-white/60 dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200/30 dark:border-slate-700/40 shadow">
        <h2 className="text-lg font-bold text-slate-700 dark:text-slate-200 mb-2">
          This Month
        </h2>
        <p className="text-blue-500 font-semibold">Income: ৳{monthIncome}</p>
        <p className="text-orange-500 font-semibold">Expense: ৳{monthExpense}</p>
      </div>

      {/* ===== RECENT TRANSACTIONS ===== */}
      <h2 className="text-xl font-bold mb-3 text-slate-700 dark:text-slate-300">
        Recent Transactions
      </h2>

      <div className="space-y-3 mb-8">
        {recent.map((t) => (
          <div
            key={t.id}
            className="p-4 rounded-xl bg-white/60 dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200/20 dark:border-slate-700/40 shadow hover:scale-[1.02] transition"
          >
            <div className="flex justify-between items-center">
              <p className="text-lg font-semibold text-slate-700 dark:text-slate-200">
                {t.person}
              </p>
              <span
                className={`px-3 py-1 rounded-full text-xs text-white ${
                  t.type === "loan"
                    ? "bg-red-500"
                    : t.type === "lend"
                    ? "bg-green-500"
                    : t.type === "income"
                    ? "bg-blue-500"
                    : "bg-orange-500"
                }`}
              >
                {t.type.toUpperCase()}
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 mt-1">
              ৳{t.amount} — {t.date}
            </p>
          </div>
        ))}

        {items.length === 0 && (
          <p className="text-slate-500 text-center">No transactions yet.</p>
        )}
      </div>

      {/* ===== QUICK ACTIONS ===== */}
      <h2 className="text-xl font-bold mb-3 text-slate-700 dark:text-slate-300">
        Quick Actions
      </h2>

      <div className="grid grid-cols-2 gap-5">
        {/* Loan Button */}
        <a
          href="/add-loan"
          className="p-6 rounded-2xl bg-white/60 dark:bg-slate-900/50 backdrop-blur-xl border border-red-400/20 shadow hover:scale-[1.05] transition-all"
        >
          <ArrowUpCircleIcon className="w-7 h-7 text-red-500 mb-2" />
          <p className="text-lg font-bold text-red-500">Add Loan</p>
        </a>

        {/* Lend Button */}
        <a
          href="/add-lend"
          className="p-6 rounded-2xl bg-white/60 dark:bg-slate-900/50 backdrop-blur-xl border border-green-400/20 shadow hover:scale-[1.05] transition-all"
        >
          <ArrowDownCircleIcon className="w-7 h-7 text-green-500 mb-2" />
          <p className="text-lg font-bold text-green-500">Add Lend</p>
        </a>

        {/* Income Button */}
        <a
          href="/add-income"
          className="p-6 rounded-2xl bg-white/60 dark:bg-slate-900/50 backdrop-blur-xl border border-blue-400/20 shadow hover:scale-[1.05] transition-all"
        >
          <PlusCircleIcon className="w-7 h-7 text-blue-500 mb-2" />
          <p className="text-lg font-bold text-blue-500">Add Income</p>
        </a>

        {/* Expense Button */}
        <a
          href="/add-expense"
          className="p-6 rounded-2xl bg-white/60 dark:bg-slate-900/50 backdrop-blur-xl border border-orange-400/20 shadow hover:scale-[1.05] transition-all"
        >
          <MinusCircleIcon className="w-7 h-7 text-orange-500 mb-2" />
          <p className="text-lg font-bold text-orange-500">Add Expense</p>
        </a>

        {/* Dashboard */}
        <a
          href="/dashboard"
          className="col-span-2 p-6 rounded-2xl bg-gradient-to-r from-primary to-indigo-700 text-white shadow-xl hover:scale-[1.04] transition"
        >
          <div className="flex items-center gap-3">
            <ClipboardDocumentListIcon className="w-7 h-7" />
            <p className="text-2xl font-semibold">Dashboard</p>
          </div>
        </a>

        {/* Reports */}
        <a
          href="/reports"
          className="col-span-2 p-6 rounded-2xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-300/20 shadow hover:scale-[1.04] transition"
        >
          <div className="flex items-center gap-3">
            <ChartBarIcon className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
            <p className="text-2xl font-semibold">Reports</p>
          </div>
        </a>
      </div>
    </div>
  );
}
