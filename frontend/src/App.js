import React, { useEffect, useState } from 'react';

import TransactionList from './components/TransactionList';
import Pagination from './components/Pagination';;

function App() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [hash, setHash] = useState("");
  const [total, setTotal] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    fetch(
      `http://localhost:5000/api/transactions?page=${page}&pageSize=${pageSize}&txHash=${hash}&startDate=${startDate}&endDate=${endDate}`
    )
      .then((res) => res.json())
      .then((data) => {
        setItems(data.items);
        setTotal(data.total);
      });
  }, [page, pageSize, hash, startDate, endDate]);

  return (
    <div className="p-4 flex flex-col items-center">
      <div className="w-full max-w-4xl mb-6">
        <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
          <input
            type="text"
            placeholder="Search by hash"
            className="border p-2 flex-grow"
            value={hash}
            onChange={(e) => setHash(e.target.value)}
          />
          <input
            type="date"
            onChange={(e) => setStartDate(e.target.value)}
            className="border p-2"
            placeholder="Start Date"
          />
          <input
            type="date"
            onChange={(e) => setEndDate(e.target.value)}
            className="border p-2"
            placeholder="End Date"
          />
        </div>
      </div>

      <div className="w-full max-w-4xl">
        <TransactionList items={items} />
      </div>

      <div className="w-full max-w-4xl mt-6">
        <Pagination
          page={page}
          setPage={setPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
          total={total}
        />
      </div>
    </div>
  );
}

export default App;
