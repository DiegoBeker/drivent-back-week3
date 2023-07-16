import { Router } from 'express';
import { authenticateToken } from '../middlewares';
import { getAllHotels, getHotelById } from '../controllers/hotels-controller';

const hotelsRouter = Router();

hotelsRouter.use(authenticateToken);
hotelsRouter.get('/', getAllHotels);
hotelsRouter.get('/:hotelId', getHotelById);

export { hotelsRouter };
