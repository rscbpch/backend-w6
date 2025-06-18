import express, { json } from "express";
import cors from "cors";
import articleRouter from "./routes/articleRoutes.js";
import db from './utils/database.js';

const app = express();


// Enable CORS for all routes and origins
app.use(cors());

// Enable json serialization
app.use(json());

app.use("/api/articles", articleRouter);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.get('/test-db', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT 1 + 1 AS result');
    res.json({ success: true, result: rows[0].result }); // should return 2
  } catch (err) {
    res.status(500).json({ success: false, message: 'DB connection failed', error: err.message });
  }
});