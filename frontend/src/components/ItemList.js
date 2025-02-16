import React from 'react';

const ItemList = ({ items }) => {
  return (
    <ul className='space-y-2'>
      {items.map(item => (
        <li key={item.id} className='border p-2 rounded'>
          {item.name}
        </li>
      ))}
    </ul>
  );
};

export default ItemList;
