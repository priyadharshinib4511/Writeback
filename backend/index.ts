import express, { Express, Request, Response } from 'express';
import cors from 'cors';

const app: Express = express();
const port = 8080;

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to nlux + Node.js demo server!');
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});