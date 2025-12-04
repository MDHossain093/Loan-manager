// src/pages/reports.js
import { useLoanStore } from "@lib/store";
import { useEffect, useState } from "react";

export default function Reports() {
  const items = useLoanStore((s) => s.transactions);

  const totalLoan = items.filter(x => x.type === "loan").reduce((s, x) => s + Number(x.amount), 0);
  const totalLend = items.filter(x => x.type === "lend").reduce((s, x) => s + Number(x.amount), 0);
  const totalIncome = items.filter(x => x.type === "income").reduce((s, x) => s + Number(x.amount), 0);
  const totalExpense = items.filter(x => x.type === "expense").reduce((s, x) => s + Number(x.amount), 0);

  const netLoanLend = totalLend - totalLoan;
  const netIncomeExpense = totalIncome - totalExpense;
  const finalNetBalance = netLoanLend + netIncomeExpense;

  // Expense categories
  const categories = {};
  items
    .filter((x) => x.type === "expense")
    .forEach((x) => {
      if (!categories[x.category]) categories[x.category] = 0;
      categories[x.category] += Number(x.amount);
    });

  // Monthly breakdown
  const months = Array(12).fill(0).map(() => ({
    loan: 0,
    lend: 0,
    income: 0,
    expense: 0,
  }));

  items.forEach((t) => {
    const m = new Date(t.date).getMonth();
    months[m][t.type] += Number(t.amount);
  });

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  // Largest transactions
  const top = (type) =>
    items
      .filter((x) => x.type === type)
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5);

  // Export JSON
  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(items, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "cashnex-report.json";
    a.click();
  };

  // Export CSV
  const exportCSV = () => {
    const header = "Type,Person,Amount,Date,Category\n";
    const rows = items
      .map((t) => `${t.type},${t.person},${t.amount},${t.date},${t.category || ""}`)
      .join("\n");

    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "cashnex-report.csv";
    a.click();
  };

  return (
    <div className="min-h-screen px-6 pt-10 pb-24">
      <h1 className="text-4xl font-extrabold mb-8 tracking-tight bg-gradient-to-r from-indigo-500 to-violet-600 text-transparent bg-clip-text">Reports</h1>

      {/* EXPORT BUTTONS */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={exportJSON}
          className="px-4 py-2 rounded-lg bg-indigo-600 text-white shadow hover:bg-indigo-700"
        >
          Export JSON
        </button>
        <button
          onClick={exportCSV}
          className="px-4 py-2 rounded-lg bg-green-600 text-white shadow hover:bg-green-700"
        >
          Export CSV
        </button>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <SummaryCard label="Total Loan" value={totalLoan} color="red" />
        <SummaryCard label="Total Lend" value={totalLend} color="green" />
        <SummaryCard label="Total Income" value={totalIncome} color="blue" />
        <SummaryCard label="Total Expense" value={totalExpense} color="orange" />

        <SummaryCard label="Net Loan / Lend" value={netLoanLend} class="col-span-2 p-5 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-700 text-white shadow-xl" wide />
        <SummaryCard label="Net Income / Expense" value={netIncomeExpense} class="col-span-2 p-5 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-700 text-white shadow-xl" wide />
        <SummaryCard label="Final Net Balance" value={finalNetBalance} class="col-span-2 p-5 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-700 text-white shadow-xl" wide large />
      </div>

      {/* CATEGORY BREAKDOWN */}
      <SectionTitle title="Expense Categories" />
      <div className="space-y-2 mb-10">
        {Object.keys(categories).length === 0 && (
          <p className="text-slate-500">No expenses recorded.</p>
        )}
        {Object.entries(categories).map(([cat, amt]) => (
          <div key={cat} className="flex justify-between bg-white/80 dark:bg-slate-900/70 px-4 py-3 rounded-xl">
            <span>{cat}</span>
            <span className="font-semibold">৳{amt}</span>
          </div>
        ))}
      </div>

      {/* MONTHLY BREAKDOWN */}
      <SectionTitle title="Monthly Summary" />
      <div className="space-y-4">
        {months.map((m, i) => {
          const net = m.lend - m.loan + m.income - m.expense;
          return (
            <div
              key={i}
              className="p-4 rounded-xl bg-white/80 dark:bg-slate-900/70 shadow"
            >
              <h3 className="text-lg font-bold mb-2">{monthNames[i]}</h3>
              <p>Loan: ৳{m.loan}</p>
              <p>Lend: ৳{m.lend}</p>
              <p>Income: ৳{m.income}</p>
              <p>Expense: ৳{m.expense}</p>
              <p className={`font-bold mt-1 ${net >= 0 ? "text-green-500" : "text-red-500"}`}>
                Net: ৳{net}
              </p>
            </div>
          );
        })}
      </div>

      {/* TOP TRANSACTIONS */}
      <SectionTitle title="Largest Transactions" />

      <TopList title="Top Loans" items={top("loan")} />
      <TopList title="Top Lends" items={top("lend")} />
      <TopList title="Top Income" items={top("income")} />
      <TopList title="Top Expenses" items={top("expense")} />
    </div>
  );
}

/* COMPONENTS */

function SectionTitle({ title }) {
  return <h2 className="text-2xl font-bold mt-10 mb-4">{title}</h2>;
}

function SummaryCard({ label, value, color, wide, large, class: className }) {
  return (
    <div
      className={className || `${wide ? "col-span-2" : ""} p-4 rounded-xl bg-white/70 dark:bg-slate-800/70 shadow`}
    >
      <p className="text-sm text-slate-500 dark:text-slate-300">{label}</p>
      <h2
        className={`font-bold ${
          large ? "text-2xl" : "text-xl"
        } ${className ? "" : `text-${color}-500`}`}
      >
        ৳{value}
      </h2>
    </div>
  );
}

function TopList({ title, items }) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-bold mb-3">{title}</h3>
      {items.length === 0 && <p className="text-slate-500">No data available.</p>}
      <div className="space-y-2">
        {items.map((x) => (
          <div
            key={x.id}
            className="flex justify-between bg-white/80 dark:bg-slate-900/70 px-4 py-3 rounded-xl"
          >
            <span>{x.person}</span>
            <span className="font-semibold">৳{x.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
