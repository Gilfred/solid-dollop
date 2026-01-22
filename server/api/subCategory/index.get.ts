import { defineEventHandler, setResponseStatus } from 'h3';
import { prisma } from '../../utils/prisma';

export default defineEventHandler(async (event) => {
  const subCategories = await prisma.subCategory.findMany();
  setResponseStatus(event, 200);
  return subCategories;
});