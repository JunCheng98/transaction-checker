const express = require('express');
const cors = require('cors');
const itemsRoutes = require('./routes/items');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use('/api/items', itemsRoutes);

app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
