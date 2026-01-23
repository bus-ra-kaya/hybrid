import 'dotenv/config';
import authRoutes from './routes/auth.js';
import postRoutes from './routes/posts.js'
import { errorHandler } from './middleware/errorHandler.js';
import express from 'express';

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use('api/auth',authRoutes);
app.use('/api/posts', postRoutes);

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
})
