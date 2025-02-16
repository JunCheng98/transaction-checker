const express = require('express');
const router = express.Router();
const items = require('../data/items');

// GET /api/items - Retrieve items with pagination, search, and sorting
router.get('/', (req, res) => {
  const { page = 1, pageSize = 10, search = '' } = req.query;
  const filteredItems = items
    .filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const paginatedItems = filteredItems.slice((page - 1) * pageSize, page * pageSize);
  res.json({ total: filteredItems.length, items: paginatedItems });
});

module.exports = router;
