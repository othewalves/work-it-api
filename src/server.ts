
import express, { Request, Response } from 'express';
import path from 'path';

import * as router from './routes';

import cookieParser from 'cookie-parser';

import cors from 'cors';

const app = express();

const PORT = 5000;

app.use(express.json());

app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"], // inclui os headers que vc usa
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
}));

// app.disable("etag");

app.use(
    '/files',
    express.static(path.resolve(__dirname, '..', 'tmp'))
);

app.get('/', (_req: Request, res: Response) => {
    res.send('API do Reservaê tá on!👋')
});

app.use('/user', router.userRouter);
app.use('/api/auth', router.authRouter);
app.use('/store', router.storeRouter);
app.use('/address', router.addressRouter);
app.use('/category', router.categoryRouter);

app.listen(PORT, () => {
    console.log(`API no ar, acesse: http://localhost:${PORT}`)
})