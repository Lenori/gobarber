import {Router} from 'express';
import multer from 'multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import AppointmentController from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';
import NotificationController from './app/controllers/NotificationController';
import AvailableController from './app/controllers/AvailableController';

import authMiddleware from './app/middlewares/auth';

import multerConfig from './config/multer'

const routes = new Router();
const upload = multer(multerConfig);

routes.get('/debug', (req, res) => {
    throw new Error('My first Sentry error!');
  });

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.get('/providers', ProviderController.index);
routes.get('/providers/:id/available', AvailableController.index);
routes.get('/appointments', AppointmentController.index);
routes.get('/schedule', ScheduleController.index);
routes.get('/notifications', NotificationController.index);

routes.post('/files', upload.single('file'), FileController.store);
routes.post('/appointments', AppointmentController.store);

routes.put('/users', UserController.update);
routes.put('/notifications/:id', NotificationController.update);

routes.delete('/appointments/:id', AppointmentController.delete);

export default routes;