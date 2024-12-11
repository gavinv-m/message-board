import { Router } from 'express';
import formController from '../controllers/newRouterController.js';

const newRouter = Router();

newRouter.get('/', formController.getForm);
newRouter.post('/', formController.postForm);

export default newRouter;
