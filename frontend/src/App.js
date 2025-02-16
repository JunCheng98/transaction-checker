import React, { useEffect, useState } from 'react';
import ItemList from './components/ItemList';
import Pagination from './components/Pagination';

function App() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState('');
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:5000/api/items?page=${page}&pageSize=${pageSize}&search=${search}`)
      .then(res => res.json())
      .then(data => {
        setItems(data.items);
        setTotal(data.total);
      });
  }, [page, pageSize, search]);

  return (
    <div className='p-4'>
      <input 
        type='text' 
        placeholder='Search by name' 
        className='border p-2 mb-4' 
        value={search} 
        onChange={(e) => setSearch(e.target.value)} 
      />
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
