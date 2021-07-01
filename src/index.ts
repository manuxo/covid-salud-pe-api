import "reflect-metadata";
import * as dotenv from "dotenv";
import express from 'express';
import morgan = require('morgan');
import cors = require('cors');
import { errorHandler } from "./lib/middlewares/error-handler";
import DistrictRouter from "./routes/districts/DistrictRouter";
import UserRouter from "./routes/users/UserRouter";
import AllergyRouter from "./routes/allergies/AllergyRouter";

const result = dotenv.config()
console.log('dotenv - Leyendo variables de entorno...');
if (result.error) {
    console.log('dotenv - Error al leer variables de entorno');
    console.error(result.error);
}
console.log('dotenv - Variables de entorno leídas satisfactoriamente');
console.log(result.parsed);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan('tiny'));

app.use('/districts', DistrictRouter);
app.use('/users', UserRouter);
app.use('/allergies', AllergyRouter)

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('The application is listening on port: ', PORT);
})