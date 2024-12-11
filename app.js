import express from 'express';
import path from 'node:path';
import messages from './messages.js';
import newRouter from './routers/newRouter.js';

const app = express();
app.set('views', path.join(process.cwd(), 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

app.use('/new', newRouter);
app.get('/', (req, res) => {
  res.render('index', { messages: messages });
});

const PORT = 3000;
app.listen(PORT);
