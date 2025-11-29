import { PlusIcon } from "@heroicons/react/24/solid";

export default function FloatingActionButton() {
  return (
    <a
      href="/add-loan"
      className="fixed bottom-20 right-6 z-50 w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition"
    >
      <PlusIcon className="w-7 h-7" />
    </a>
  );
}
