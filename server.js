import express from "express";
const app = express();
import "dotenv/config";
import cors from 'cors';
import signupRoutes from "./routes/signupRoutes.js";
import loginRoutes from "./routes/loginRoutes.js";
import scoreController from "./controllers/scoreController.js";


app.use(express.json());
app.use(cors());

app.use('/signup', signupRoutes);
app.use('/login', loginRoutes);
app.post('/addScore', scoreController.addScore);
app.get('/lastScore/:id', scoreController.lastScore);
app.get('/highScore/:id', scoreController.highScore);

app.listen(process.env.PORT, () => console.log(`Listening at http://localhost:${process.env.PORT}`));