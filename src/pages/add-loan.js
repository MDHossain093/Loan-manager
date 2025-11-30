import TransactionForm from "@components/TransactionForm";

export default function AddLoanPage() {
  return (
    <div className="pb-24 px-4 pt-10">
      <TransactionForm type="loan" />
    </div>
  );
}
