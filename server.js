import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { router } from './dsa.routes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// 1. Enable CORS for local and deployed frontend
app.use(cors());
app.use(express.json());

// 2. Route handlers
app.use(router);

app.listen(PORT, () => console.log(`🚀 AlgoMentor Backend running at http://localhost:${PORT}`));