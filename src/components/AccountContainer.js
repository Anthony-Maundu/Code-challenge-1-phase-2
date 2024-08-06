import React, { useState, useEffect } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

function AccountContainer() {
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransaction] = useState([]);
  const [search, setSearch] = useState("");

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

  const handlePostNewTransaction = async (e, formData) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8001/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, amount: parseInt(formData.amount) }),
    });
    if (!response.ok) {
      alert("Failed to add a new transaction! retry");
    } else {
      getTransactions();
    }
  };

  useEffect(() => {
    if (search !== "") {
      setFilteredTransaction(
        transactions.filter((transaction) =>
          transaction.description.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else {
      setFilteredTransaction(transactions);
    }
  }, [transactions, search]);

  return (
    <div>
      <Search search={search} setSearch={setSearch} />
      <AddTransactionForm handlePostNewTransaction={handlePostNewTransaction} />
      <TransactionsList loading={loading} transactions={filteredTransactions} />
    </div>
  );
}

export default AccountContainer;
