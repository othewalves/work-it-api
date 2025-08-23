import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();
app.use(cookieParser());

app.get('/', (_req, res) => {
    res.cookie('workit_token', '123', { httpOnly: true, secure: false });
    res.send('Cookie setado!');
});

app.listen(5000, () => console.log('Servidor no ar'));
