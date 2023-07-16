import { notFoundError } from '../../errors';
import { paymentRequiredError } from '../../errors/payment-required-error';
import enrollmentRepository from '../../repositories/enrollment-repository';
import hotelRepository from '../../repositories/hotel-repository';
import ticketsRepository from '../../repositories/tickets-repository';

async function getAllHotels(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();

  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket) throw notFoundError();

  if (ticket.TicketType.isRemote || ticket.status !== 'PAID' || !ticket.TicketType.includesHotel)
    throw paymentRequiredError('Payment required');

  return await hotelRepository.getAllHotels();
}

async function getHotelById(userId: number, hotelId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();

  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket) throw notFoundError();

  if (ticket.TicketType.isRemote || ticket.status !== 'PAID' || !ticket.TicketType.includesHotel)
    throw paymentRequiredError('Payment required');

  return await hotelRepository.getHotelById(hotelId);
}

const hotelsService = {
  getAllHotels,
  getHotelById,
};

export default hotelsService;
