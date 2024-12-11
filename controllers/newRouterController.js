import messages from '../messages.js';
import formatCurrentDate from '../date.js';

const getForm = (req, res) => {
  res.render('form');
};

const postForm = (req, res) => {
  const user = req.body.fname;
  const messageText = req.body.ftext;
  messages.push({ user: user, text: messageText, added: formatCurrentDate() });
  res.redirect('/');
};

const formController = { getForm, postForm };

export default formController;
