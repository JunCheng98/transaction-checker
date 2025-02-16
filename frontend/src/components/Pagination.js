import React from 'react';

const Pagination = ({ page, setPage, pageSize, setPageSize, total }) => {
  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className='mt-4'>
      <button 
        onClick={() => setPage(prev => Math.max(prev - 1, 1))} 
        disabled={page === 1}
      >
        Previous
      </button>
      <span className='px-4'>{page} / {totalPages}</span>
      <button 
        onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
        disabled={page === totalPages}
      >
        Next
      </button>
      <select 
        onChange={(e) => setPageSize(Number(e.target.value))} 
        value={pageSize} 
        className='ml-4'
      >
        {[10, 20, 50].map(size => (
          <option key={size} value={size}>{size} per page</option>
        ))}
      </select>
    </div>
  );
};

export default Pagination;
