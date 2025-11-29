// src/components/TransactionForm.jsx
import { useState } from "react";
import { useLoanStore } from "@lib/store";

export default function TransactionForm({ type, editData }) {
  const add = useLoanStore((s) => s.add);
  const update = useLoanStore((s) => s.update);

  const isEdit = Boolean(editData);

  const [person, setPerson] = useState(editData?.person || "");
  const [amount, setAmount] = useState(editData?.amount || "");
  const [date, setDate] = useState(editData?.date || "");
  const [category, setCategory] = useState(editData?.category || "Other");

  const save = () => {
    if (!person || !amount || !date) return alert("Fill all fields");

    if (isEdit) {
      update(editData.id, {
        person,
        amount,
        date,
        category: type === "expense" ? category : null,
      });
    } else {
      add({
        id: Date.now(),
        type,
        person,
        amount,
        date,
        category: type === "expense" ? category : null,
      });
    }

    alert(isEdit ? "Updated!" : "Saved!");
    window.history.back();
  };

  const labelMap = {
    loan: "Add Loan",
    lend: "Add Lend",
    income: "Add Income",
    expense: "Add Expense",
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-8 
        bg-white/20 dark:bg-slate-900/30 
        backdrop-blur-3xl border border-white/30 dark:border-slate-700/40 
        shadow-[0_8px_35px_rgba(0,0,0,0.3)] rounded-3xl">

      <h2 className="text-3xl font-extrabold mb-6 
          bg-gradient-to-r from-indigo-500 to-violet-600 
          bg-clip-text text-transparent">
        {isEdit ? "Edit Transaction" : labelMap[type]}
      </h2>

      <div className="space-y-5">

        {/* Person field */}
        <div>
          <label className="block text-sm font-medium mb-1">Person / Note</label>
          <input
            type="text"
            value={person}
            onChange={(e) => setPerson(e.target.value)}
            className="w-full p-3 rounded-xl bg-white/60 dark:bg-slate-800/60 border border-slate-300 dark:border-slate-700 outline-none"
            placeholder="Name or description"
          />
        </div>

        {/* Amount */}
        <div>
          <label className="block text-sm font-medium mb-1">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-3 rounded-xl bg-white/60 dark:bg-slate-800/60 border border-slate-300 dark:border-slate-700 outline-none"
            placeholder="Enter amount"
          />
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium mb-1">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-3 rounded-xl bg-white/60 dark:bg-slate-800/60 border border-slate-300 dark:border-slate-700 outline-none"
          />
        </div>

        {/* Category (ONLY for expense) */}
        {type === "expense" && (
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-3 rounded-xl 
                  bg-white/60 dark:bg-slate-800/60 
                  border border-slate-300 dark:border-slate-700 outline-none"
            >
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Shopping">Shopping</option>
              <option value="Bills">Bills</option>
              <option value="Health">Health</option>
              <option value="Other">Other</option>
            </select>
          </div>
        )}

        {/* Save button */}
        <button
          onClick={save}
          className="w-full py-3 rounded-xl text-lg font-semibold 
              bg-gradient-to-r from-indigo-600 to-violet-600 
              text-white shadow-lg hover:scale-[1.03] active:scale-[0.97]"
        >
          {isEdit ? "Update" : "Save"}
        </button>
      </div>
    </div>
  );
}
