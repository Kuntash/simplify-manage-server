
import dotenv from 'dotenv';

dotenv.config({
  path: `${__dirname}/config.env`
});
import app from './app';
console.log(process.env.PORT);
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server hosted at localhost:${port}`);
});