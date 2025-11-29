import { useLoanStore } from "@lib/store";
import { useRouter } from "next/router";

export default function Dashboard() {
  const router = useRouter();   // ✅ FIX: define router inside component
  const items = useLoanStore((s) => s.transactions);

  return (
    <div className="min-h-screen px-6 pt-10 pb-24">
      <h1 className="text-4xl font-bold tracking-tight mb-6">Dashboard</h1>

      <div className="space-y-4">
        {items.map((t) => (
          <div
            key={t.id}
            className="p-5 rounded-2xl shadow-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-l-8 transition hover:scale-[1.02]"
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

                {/* EDIT BUTTON */}
                <button
                  onClick={() => router.push(`/edit?id=${t.id}`)}
                  className="px-3 py-1 rounded-lg bg-indigo-500 text-white text-xs hover:bg-indigo-600"
                >
                  Edit
                </button>
              </div>
            </div>

            <p className="text-slate-700 dark:text-slate-200 mt-2 text-lg font-medium">
              ৳{t.amount}
            </p>
            <p className="text-slate-400 text-sm">Date: {t.date}</p>
          </div>
        ))}

        {items.length === 0 && (
          <p className="text-slate-500 text-center mt-20 text-lg">
            No records yet…
          </p>
        )}
      </div>
    </div>
  );
}
