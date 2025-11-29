import {
  HomeIcon,
  PlusCircleIcon,
  ClipboardDocumentListIcon,
  ChartBarIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
import { useDarkMode } from "@/hooks/useDarkMode";

export default function BottomNav() {
  const { enabled, toggle } = useDarkMode();

  return (
    <div className="fixed bottom-4 left-4 right-4 z-40">
      <div className="flex items-center justify-between px-5 py-3 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/70 dark:border-slate-700 shadow-xl">
        <a href="/" className="flex flex-col items-center text-xs">
          <HomeIcon className="w-5 h-5 mb-0.5" />
          <span>Home</span>
        </a>
        <a href="/dashboard" className="flex flex-col items-center text-xs">
          <ClipboardDocumentListIcon className="w-5 h-5 mb-0.5" />
          <span>Records</span>
        </a>
        <a href="/reports" className="flex flex-col items-center text-xs">
          <ChartBarIcon className="w-5 h-5 mb-0.5" />
          <span>Reports</span>
        </a>
        <button
          onClick={toggle}
          className="flex flex-col items-center text-xs"
        >
          {enabled ? (
            <>
              <SunIcon className="w-5 h-5 mb-0.5" />
              <span>Light</span>
            </>
          ) : (
            <>
              <MoonIcon className="w-5 h-5 mb-0.5" />
              <span>Dark</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
