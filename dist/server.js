import express from 'express';
import db from './config/connection.js';
import routes from './routes/index.js';
await db();
const PORT = 3001;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);
app.listen(PORT, async () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
