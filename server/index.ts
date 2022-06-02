import express, { Express, Request, Response } from 'express';
import Redis from 'redis';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3001;
const app: Express = express();

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.send('<h1>Hello from the TypeScript world!</h1>');
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));