import { useEffect, useState } from "react";

const PIN = "1234"; // you can change this

export default function PasscodeGate({ children }) {
  const [unlocked, setUnlocked] = useState(false);
  const [code, setCode] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("loan_unlocked");
    if (saved === "true") setUnlocked(true);
  }, []);

  const submit = () => {
    if (code === PIN) {
      setUnlocked(true);
      localStorage.setItem("loan_unlocked", "true");
      setCode("");
    } else {
      alert("Wrong PIN");
      setCode("");
    }
  };

  if (unlocked) return children;

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 bg-[radial-gradient(circle_at_top,_#4f46e5_0,_transparent_60%),radial-gradient(circle_at_bottom,_#0ea5e9_0,_transparent_60%)]">
      <div className="w-full max-w-xs bg-slate-900/70 border border-slate-700 rounded-3xl p-6 backdrop-blur-xl shadow-2xl">
        <h1 className="text-xl font-semibold text-white mb-2 text-center">
          Enter Passcode
        </h1>
        <p className="text-slate-400 text-sm mb-4 text-center">
          Protecting your loan records
        </p>
        <input
          type="password"
          maxLength={4}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full p-3 rounded-2xl bg-slate-800 text-white text-center tracking-[0.5em] text-lg outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          onClick={submit}
          className="w-full mt-4 py-3 rounded-2xl bg-primary text-white font-semibold hover:bg-indigo-700 transition"
        >
          Unlock
        </button>
      </div>
    </div>
  );
}
