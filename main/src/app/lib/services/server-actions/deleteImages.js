import { prisma } from '@/app/lib/prisma';
import { TryCatch } from '@/app/helpers/TryCatch';
import { resError, resSuccess } from '@/app/helpers/resObj';

export const deleteProductImagesService = async({id}) => {
  return await TryCatch(async () => {
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
    return resSuccess(true);
  })
}
