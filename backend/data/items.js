// Sample Data
const items = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    name: `Item ${i + 1}`,
    createdAt: new Date(Date.now() - i * 1000 * 60).toISOString()
  }));
  
  module.exports = items;
  