// lib/store.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useLoanStore = create(
  persist(
    (set) => ({
      transactions: [],

      // Add new transaction
      add: (item) =>
        set((state) => ({
          transactions: [...state.transactions, item],
        })),

      // Update existing transaction
      update: (id, updated) =>
        set((state) => ({
          transactions: state.transactions.map((t) =>
            t.id === id ? { ...t, ...updated } : t
          ),
        })),

      // Delete transaction
      remove: (id) =>
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        })),

      // Reset all data
      reset: () =>
        set(() => ({
          transactions: [],
        })),
    }),
    {
      name: "loan-storage", // key in localStorage
    }
  )
);
