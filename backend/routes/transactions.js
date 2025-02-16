const express = require('express');
const router = express.Router();
const transactions = require('../data/transactions');

// GET /api/transactions - Retrieve transactions with pagination, search (time range, hash) and sorting
router.get('/', (req, res) => {
  const { page = 1, pageSize = 10, searchHash = '', startDate, endDate } = req.query;
  const filteredTx = transactions
    .filter(tx => tx.hash.toLowerCase().includes(searchHash.toLowerCase()))
    .filter(tx => {
      if (startDate && tx.timestamp < Date.parse(startDate)) return false;
      if (endDate && tx.timestamp > Date.parse(endDate)) return false;
      return true;
    })
    .sort((a, b) => b.timestamp - a.timestamp);

  const paginatedTx = filteredTx.slice((page - 1) * pageSize, page * pageSize);
  res.json({ total: filteredTx.length, items: paginatedTx });
});

module.exports = router;
