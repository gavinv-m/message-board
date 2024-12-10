import express from 'express';
import path from 'node:path';
import newRouter from './routers/newRouter.js';

const messages = [
  {
    text: 'Hi there!',
    user: 'Amando',
    added: new Date(),
  },
  {
    text: 'Hello World!',
    user: 'Charles',
    added: new Date(),
  },
];

const app = express();
app.set('views', path.join(process.cwd(), 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', { messages: messages });
});

// TODO: Remove callback
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`My first Express app - listening on port ${PORT}!`);
});
