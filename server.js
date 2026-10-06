import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { router } from './dsa.routes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// 1. Enable CORS so React on port 3000 can make requests
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// 2. Route handlers
app.use(router);

app.listen(PORT, () => console.log(`🚀 AlgoMentor Backend running at http://localhost:${PORT}`));