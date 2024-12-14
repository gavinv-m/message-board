import db from '../db/queries.js';
import formatCurrentDate from '../date.js';

const getForm = (req, res) => {
  res.render('form');
};

const postForm = async (req, res) => {
  const username = req.body.fname;
  const messageText = req.body.ftext;
  await db.postMessage({
    username: username,
    text: messageText,
    added: formatCurrentDate(),
  });
  res.redirect('/');
};

const formController = { getForm, postForm };

// Exports to newRouter
export default formController;
