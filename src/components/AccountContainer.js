import React, { useState, useEffect } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

function AccountContainer() {
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);

  const getTransactions = async () => {
    try {
      setLoading(true);

      const response = await fetch("http://localhost:8001/transactions");

      const data = await response.json();

      setTransactions(data);
      setLoading(false);
    } catch (error) {
      console.log("Error is: ", error);
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);
  return (
    <div>
      <Search />
      <AddTransactionForm />
      <TransactionsList loading={loading} transactions={transactions} />
    </div>
  );
}

export default AccountContainer;
