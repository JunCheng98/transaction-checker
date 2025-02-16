const express = require('express');
const cors = require('cors');
const transactionsRoute = require('./routes/transactions');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use('/api/transactions', transactionsRoute);

app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
