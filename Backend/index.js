import express from 'express';
import dotenv from "dotenv";
dotenv.config({})
import db from './db.js';
import cors from 'cors';
import todoRoute from'./routes/todo.routes.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api', todoRoute)

const PORT = 5000 || 3000;
app.listen(PORT, () => {
    console.log('Serving on port ' + PORT);
});
