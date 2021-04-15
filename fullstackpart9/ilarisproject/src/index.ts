import express from 'express';
import diaryRouter from './routes/diaryRouter';

const app = express();
app.use(express.json());

app.get("/ping", (_req, res) => {
    res.send("pong");
});



app.use('/api/diaries', diaryRouter);

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}`);
});