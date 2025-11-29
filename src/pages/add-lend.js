import LoanForm from "@components/TransactionForm";

export default function AddLendPage() {
  return (
    <div className="pb-24 px-4 pt-10">
      <LoanForm type="lend" />
    </div>
  );
}
