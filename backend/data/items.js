// Sample Data
let items = [];

// Simulate external stream with setInterval
setInterval(() => {
  const newItem = {
    id: items.length + 1,
    name: `Streamed Item ${items.length + 1}`,
    createdAt: new Date().toISOString()
  };
  items.push(newItem)
}, 5000);
  
module.exports = items;
  