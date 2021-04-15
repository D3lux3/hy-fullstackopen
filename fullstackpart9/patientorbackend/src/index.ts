import express from 'express';
import cors from 'cors';
import patientRouter from './routers/patientRouter';
import diagnosesRouter from './routers/diagnosesRouter';

const app = express();
app.use(express.json());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
    console.log('Someone pinged here');
    res.send("pong");
});

app.use('/api/patients', patientRouter);
app.use('/api/diagnoses', diagnosesRouter);

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});