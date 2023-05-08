import React, { useState, useEffect } from "react";
import Transaction from "./Transaction";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [displayMode, setDisplayMode] = useState("show"); 
  const [newTransaction, setNewTransaction] = useState({
    id: "",
    date: "",
    category: "",
    amount: 0,
    description: "",
  });

  useEffect(() => {
    const storedTransactions = localStorage.getItem("transactions");
    if (storedTransactions) {
      const parsedTransactions = JSON.parse(storedTransactions);
      setTransactions(parsedTransactions);
    }
  }, []);
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction({ ...newTransaction, [name]: value });
  };

  const addTransaction = () => {
    if (
      !newTransaction.date ||
      !newTransaction.category ||
      !newTransaction.amount ||
      !newTransaction.description
    ) {
      alert("Please fill in all fields");
      return;
    }
    setTransactions((prevTransactions) => {
        const updatedTransactions = [
          ...prevTransactions,
          { ...newTransaction, id: Date.now(), description: newTransaction.description },
        ];
        localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
        return updatedTransactions;
      });
    setNewTransaction({ id: "", date: "", category: "", amount: 0, description: "" });
  };

  const deleteTransaction = (id) => {
    const updatedTransactions = transactions.filter((t) => t.id !== id);
    setTransactions(updatedTransactions);
  };

  const summarizeByDate = () => {
    setDisplayMode("date");
  };

  const summarizeByMonth = () => {
    setDisplayMode("month");
  };

  const summarizeByYear = () => {
    setDisplayMode("year");
  };

  const summarizeByCategory = () => {
    setDisplayMode("category");
  };



  const renderTransactionsByDate = () => {
    const summary = transactions.reduce((acc, transaction) => {
      const date = transaction.date;
      if (!acc[date]) {
        acc[date] = [transaction];
      } else {
        acc[date].push(transaction);
      }
      return acc;
    }, {});
  
    return Object.entries(summary).map(([date, dateTransactions]) => (
      <>
          <h5 colSpan="5" style={{ fontWeight: "bold" }}>Date: {date}</h5>
        {dateTransactions.map((transaction) => (
          <Transaction
            key={transaction.id}
            transaction={transaction}
            onDelete={deleteTransaction}
          />
        ))}
      </>
    ));
  };

  const renderTransactionsByMonth = () => {
    const summary = transactions.reduce((acc, transaction) => {
      const month = transaction.date.slice(0, 7); 
      if (!acc[month]) {
        acc[month] = [transaction];
      } else {
        acc[month].push(transaction);
      }
      return acc;
    }, {});
  
    return Object.entries(summary).map(([month, monthTransactions]) => (
      <>
          <h5 colSpan="5" style={{ fontWeight: "bold" }}>Month: {month}</h5>
        {monthTransactions.map((transaction) => (
          <Transaction
            key={transaction.id}
            transaction={transaction}
            onDelete={deleteTransaction}
          />
        ))}
      </>
    ));
  };
  
  const renderTransactionsByYear = () => {
    const summary = transactions.reduce((acc, transaction) => {
      const year = transaction.date.slice(0, 4); // "YYYY"
      if (!acc[year]) {
        acc[year] = [transaction];
      } else {
        acc[year].push(transaction);
      }
      return acc;
    }, {});
  
    return Object.entries(summary).map(([year, yearTransactions]) => (
      <>
          <h5 colSpan="5" style={{ fontWeight: "bold" }}>Year: {year}</h5>
        {yearTransactions.map((transaction) => (
          <Transaction
            key={transaction.id}
            transaction={transaction}
            onDelete={deleteTransaction}
          />
        ))}
      </>
    ));
  };
  
  const renderTransactionsByCategory = () => {
    const summary = transactions.reduce((acc, transaction) => {
      const category = transaction.category;
      if (!acc[category]) {
        acc[category] = [transaction];
      } else {
        acc[category].push(transaction);
      }
      return acc;
    }, {});
  
    return Object.entries(summary).map(([category, categoryTransactions]) => (
      <>
        
        <h5 colSpan="5" style={{ fontWeight: "bold" }}>Category: {category}</h5>
        
        {categoryTransactions.map((transaction) => (
          <Transaction
            key={transaction.id}
            transaction={transaction}
            onDelete={deleteTransaction}
          />
        ))}
      </>
    ));
  };

  const renderTransactions = () => {
    switch (displayMode) {
      case "date":
        return renderTransactionsByDate();
      case "month":
        return renderTransactionsByMonth();
      case "year":
        return renderTransactionsByYear();
      case "category":
        return renderTransactionsByCategory();
      default:
        return transactions.map((transaction) => (
          <Transaction
            key={transaction.id}
            transaction={transaction}
            onDelete={deleteTransaction}
          />
        ));
    }
  };
  return (
    <div class="container mx-auto">
      <h1>Transactions</h1>
      <h5>Date</h5>
      <input
        name="date"
        type="date"
        value={newTransaction.date}
        onChange={handleInputChange}
      />
      <h5>Category</h5>
      <input
        name="category"
        type="text"
        value={newTransaction.category}
        onChange={handleInputChange}
      />
      <h5>Amount</h5>
      <input
        name="amount"
        type="number"
        value={newTransaction.amount}
        onChange={handleInputChange}
      />
      <h5>Description</h5>
      <input
        name="description"
        type="text"
        value={newTransaction.description}
        onChange={handleInputChange}
      />
      <br></br>
      <button onClick={addTransaction}>Add Transaction</button>
      <br></br>
      <div>
        <br></br>
        <button type="button" className="btn btn-primary" onClick={summarizeByDate}>Summary by date</button>
        <button type="button" className="btn btn-primary" onClick={summarizeByMonth}>Summary by month</button>
        <button type="button" className="btn btn-primary" onClick={summarizeByYear}>Summary by year</button>
        <button type="button" className="btn btn-primary" onClick={summarizeByCategory}>Summary by category</button>
        <br></br>
        <br></br>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Description</th>
              <th>Operation</th>
            </tr>
          </thead>
          <tbody>
          {renderTransactions()}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;
