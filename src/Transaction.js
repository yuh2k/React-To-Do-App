import React from 'react';

const Transaction = ({ transaction, onDelete }) => {
  return (
    <tr>
      <td>{transaction.id}</td>
      <td>{transaction.date}</td>
      <td>{transaction.category}</td>
      <td>{transaction.amount}</td>
      <td>{transaction.description}</td>
      <td>
        <button onClick={() => onDelete(transaction.id)}>Delete</button>
      </td>
    </tr>
  );
};

export default Transaction;
