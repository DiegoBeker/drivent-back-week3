import faker from '@faker-js/faker';
import { prisma } from '@/config';

export async function createRoom(hotelId: number) {
  return await prisma.room.create({
    data: {
      name: faker.random.numeric(4).toString(),
      capacity: faker.datatype.number({ min: 1, max: 3 }),
      hotelId,
    },
  });
}
