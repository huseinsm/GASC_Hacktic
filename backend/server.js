const express = require('express');
const cors = require('cors');
const geminiRoute = require('./routes/geminiRoute');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/gemini-recommendation', geminiRoute);

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
