
import express, { Request, Response } from 'express';
import path from 'path';

import * as router from './routes';

// import {cors} from 'cors';
const app = express();
const PORT = 3000;

app.use(express.json());
// app.use(cors());

app.use(
    '/files',
    express.static(path.resolve(__dirname, '..', 'tmp'))
);

app.get('/', (_req: Request, res: Response) => {
    res.send('API do Reservaê tá on!👋')
});

app.use('/user', router.userRouter);
app.use('/auth', router.authRouter);
app.use('/books', router.bookRouter);
app.use('/categories', router.categoryRouter);
app.use('/copies', router.copyRouter);

app.listen(PORT, () => {
    console.log(`API no ar, acesse: http://localhost:${PORT}`)
})