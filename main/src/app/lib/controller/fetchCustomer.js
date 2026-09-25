"use server";

import { prisma } from "@/app/lib/prisma";
import { TryCatch } from "@/app/hooks/TryCatch";
import { serializePrisma } from "@/app/hooks/serializePrisma";
import { resError, resSuccess } from "@/app/hooks/resObj";

export const fetchCustomerByEmail = async (email) => {
  if (!email) return resError("Customer Id is missing");
  return await TryCatch(async () => {
    const customer = await prisma.customer.findUnique({
      where: {
        email
      }
    });
    return resSuccess(serializePrisma(customer));
  });
};

export const fetchCustomerById = async (id) => {
  if (!id) return resError("Customer Id is missing");
  return await TryCatch(async () => {
    const customer = await prisma.customer.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        orders: true,
      },
    });
    return resSuccess(
      serializePrisma(customer)
    );
  });
};