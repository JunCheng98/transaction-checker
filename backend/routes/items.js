const express = require('express');
const router = express.Router();
const items = require('../data/items');
const transactions = require('../data/transactions');

// GET /api/transactions - Retrieve items with pagination, search (time range, hash) and sorting
router.get('/', (req, res) => {
  const { page = 1, pageSize = 10, search = '', startDate, endDate } = req.query;
  const filteredItems = items
    .filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    .filter(item => {
      if (startDate && new Date(item.createdAt) < new Date(startDate)) return false;
      if (endDate && new Date(item.createdAt) > new Date(endDate)) return false;
      return true;
    })
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const paginatedItems = filteredItems.slice((page - 1) * pageSize, page * pageSize);
  res.json({ total: filteredItems.length, items: paginatedItems });
});

module.exports = router;
