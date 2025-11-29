import "@/styles/globals.css";
import BottomNav from "@components/BottomNav";
import FloatingActionButton from "@components/FloatingActionButton";
import PasscodeGate from "@components/PasscodeGate";
import { AnimatePresence, motion } from "framer-motion";

export default function App({ Component, pageProps, router }) {
  return (
    <PasscodeGate>
      <div className="min-h-screen pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={router.route}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
          >
            <Component {...pageProps} />
          </motion.div>
        </AnimatePresence>

        <FloatingActionButton />
        <BottomNav />
      </div>
    </PasscodeGate>
  );
}
