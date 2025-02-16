import React, { useEffect, useState } from 'react';

import ItemList from './components/ItemList';
import Pagination from './components/Pagination';

function App() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState('');
  const [total, setTotal] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const fetchItems = () => {
    fetch(`http://localhost:5000/api/items?page=${page}&pageSize=${pageSize}&search=${search}&startDate=${startDate}&endDate=${endDate}`)
      .then(res => res.json())
      .then(data => {
        setItems(data.items);
        setTotal(data.total);
      });
  };

  useEffect(() => {
    fetchItems();
  }, [page, pageSize, search, startDate, endDate])

  return (
    <div className='p-4'>
      <input type='text' placeholder='Search by name' className='border p-2' value={search} onChange={(e) => setSearch(e.target.value)} />
      <input type='date' onChange={(e) => setStartDate(e.target.value)} className='border p-2' placeholder='Start Date' />
      <input type='date' onChange={(e) => setEndDate(e.target.value)} className='border p-2' placeholder='End Date' />
      <ItemList items={items} />
      <Pagination 
        page={page} 
        setPage={setPage} 
        pageSize={pageSize} 
        setPageSize={setPageSize} 
        total={total} 
      />
    </div>
  );
}

export default App;
