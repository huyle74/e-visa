import { Router } from 'express';
import paypalController from '../../controllers/paypal/paypal.controller';

const paypalRoute = Router();
paypalRoute.post('/', paypalController);

export default paypalRoute;
