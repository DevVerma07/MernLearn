import express from 'express';
import userRoute from './src/routes/index.js';
import { PORT_NUMBER, API_VERSION } from './src/utils/constants.js';
const app = express();

app.use(API_VERSION, userRoute);

app.listen(PORT_NUMBER, () => {
  console.log("Server is listening on port number 3000");
});
