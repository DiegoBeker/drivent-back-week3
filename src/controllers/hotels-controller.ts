import { Response } from 'express';
import httpStatus from 'http-status';
import hotelsService from '../services/hotels-service';
import { AuthenticatedRequest } from '@/middlewares';

export async function getAllHotels(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const hotels = await hotelsService.getAllHotels(userId);

    return res.status(httpStatus.OK).send(hotels);
  } catch (err) {
    if (err.name === 'NotFoundError') {
      return res.status(httpStatus.NOT_FOUND).send({
        message: err.message,
      });
    }
    if (err.name === 'PaymentError') {
      return res.status(httpStatus.PAYMENT_REQUIRED).send({
        message: err.message,
      });
    }
  }
}

export async function getHotelById(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const hotelId = parseInt(req.params.hotelId);

  if (isNaN(hotelId)) return res.sendStatus(httpStatus.BAD_REQUEST);

  try {
    const rooms = await hotelsService.getHotelById(userId, hotelId);

    return res.status(httpStatus.OK).send(rooms);
  } catch (err) {
    if (err.name === 'NotFoundError') {
      return res.status(httpStatus.NOT_FOUND).send({
        message: err.message,
      });
    }
    if (err.name === 'PaymentError') {
      return res.status(httpStatus.PAYMENT_REQUIRED).send({
        message: err.message,
      });
    }
  }
}
