// src/pages/dashboard.js
import { useState } from "react";
import { useLoanStore } from "@lib/store"; // or "../lib/store" if alias not set

export default function Dashboard() {
  const items = useLoanStore((s) => s.transactions);
  const remove = useLoanStore((s) => s.remove);
  const reset = useLoanStore((s) => s.reset);

  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredItems = items.filter((t) => {
    const matchQuery =
      (t.person || "")
        .toString()
        .toLowerCase()
        .includes(query.toLowerCase()) ||
      t.amount.toString().includes(query);

    const matchFilter = filter === "all" ? true : t.type === filter;

    return matchQuery && matchFilter;
  });

  return (
    <div className="min-h-screen px-6 pt-10 pb-24">
      <h1 className="text-4xl font-bold tracking-tight mb-6">Dashboard</h1>

      {/* RESET ALL DATA */}
      <button
        onClick={() => {
          if (
            typeof window !== "undefined" &&
            window.confirm(
              "⚠️ This will permanently delete ALL transactions.\nAre you sure?"
            )
          ) {
            reset();
            window.alert("All data has been reset!");
          }
        }}
        className="w-full mb-5 py-3 rounded-xl 
                   bg-red-600 text-white font-semibold 
                   shadow-lg hover:bg-red-700 
                   active:scale-95 transition"
      >
        Reset All Data
      </button>

      {/* Search */}
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by name or amount..."
        className="w-full mb-4 p-3 rounded-xl bg-white/70 dark:bg-slate-800/70 
                   border border-slate-300 dark:border-slate-700 outline-none"
      />

      {/* Filter buttons */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
        {["all", "loan", "lend", "income", "expense"].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full text-sm border shadow ${
              filter === cat
                ? "bg-indigo-600 text-white"
                : "bg-white/60 dark:bg-slate-900/40 text-slate-700 dark:text-slate-300"
            }`}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Transaction list */}
      <div className="space-y-4">
        {filteredItems.map((t) => (
          <div
            key={t.id}
            className="p-5 rounded-2xl shadow-xl bg-white/90 dark:bg-slate-900/90 
                       backdrop-blur-xl border-l-8 transition hover:scale-[1.02]"
            style={{
              borderColor:
                t.type === "loan"
                  ? "#EF4444"
                  : t.type === "lend"
                  ? "#22C55E"
                  : t.type === "income"
                  ? "#3B82F6"
                  : "#F97316",
            }}
          >
            <div className="flex justify-between items-center">
              <p className="text-xl font-semibold">{t.person}</p>

              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-white text-xs ${
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

                {/* Delete */}
                <button
                  onClick={() => {
                    if (
                      typeof window !== "undefined" &&
                      window.confirm("Delete this transaction?")
                    ) {
                      remove(t.id);
                    }
                  }}
                  className="px-3 py-1 rounded-lg bg-red-600 text-white text-xs hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>

            <p className="text-slate-700 dark:text-slate-200 mt-2 text-lg font-medium">
              ৳{t.amount}
            </p>
            <p className="text-slate-400 text-sm">
              Date: {t.date}
              {t.description && (t.type === "loan" || t.type === "lend") && (
                <> · {t.description}</>
              )}
              {t.category && t.type === "expense" && (
                <> · Category: {t.category}</>
              )}
            </p>
          </div>
        ))}

        {filteredItems.length === 0 && (
          <p className="text-slate-500 text-center mt-20 text-lg">
            No matching records…
          </p>
        )}
      </div>
    </div>
  );
}
