import React from 'react';

const TransactionList = ({ transactions }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border">Block Number</th>
            <th className="px-4 py-2 border">Hash</th>
            <th className="px-4 py-2 border">Timestamp</th>
            <th className="px-4 py-2 border">Transaction Fee (USDT)</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.hash} className="hover:bg-gray-50">
              <td className="px-4 py-2 border">{tx.blockNumber}</td>
              <td className="px-4 py-2 border">{tx.hash}</td>
              <td className="px-4 py-2 border">{new Date(tx.timestamp * 1000).toLocaleString()}</td>
              <td className="px-4 py-2 border">{tx.feeInUsdt.toFixed(6)} USDT</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;
