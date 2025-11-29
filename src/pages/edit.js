import { useRouter } from "next/router";
import { useLoanStore } from "@lib/store";
import TransactionForm from "@components/TransactionForm";

export default function Edit() {
  const router = useRouter();
  const { id } = router.query;

  const items = useLoanStore((s) => s.transactions);
  const item = items.find((i) => i.id === Number(id));

  if (!item) return <p className="p-10 text-center">Loading...</p>;

  return <TransactionForm type={item.type} editData={item} />;
}
