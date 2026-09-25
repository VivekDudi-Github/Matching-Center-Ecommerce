"use cursor";

import { prisma } from '@/app/lib/prisma';

export const deleteProductImagesService = async({id}) => {
  let filter = {};

  if(id) filter.id = id;

  const deletedRow = await prisma.productImages.delete({
    where: {
      ...filter
    }
  });

  const isExist = await prisma.productImages.findFirst({
    where: {
      publicId: deletedRow.publicId
    },
    select: { id: true }
  })
  console.log("isExist: ", isExist);
  
  if(!isExist) {
    await prisma.strandedImages.create({
      data: {
        publicId: deletedRow.publicId,
        url: deletedRow.url,
      }
    })  
  }
}
