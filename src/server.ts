import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import router from './Routes/index';

const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST as string;

const corsOptions = {
  origin: '*',
  methods: 'GET,POST',
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200,
};

const app = express();

app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use('/', router);

app.get('/', async (req: express.Request, res: express.Response): Promise<void> => {
  res.send('Welcome to storefront');
});

app.listen(PORT, HOST, function () {
  console.log(`Server listening on specified port ${PORT} and host ${HOST}`);
});

export { app };
