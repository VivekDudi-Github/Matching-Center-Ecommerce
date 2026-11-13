import { resError } from "./resObj";

export const TryCatch = async (fn) => {
  try {
    const result = await fn();
    return result;
  } catch (error) {
    console.error("PRISMA ERROR:", error);
    console.error("CODE:", error?.code);
    console.error("META:", error?.meta);
    console.error("MESSAGE:", error?.message);
    return resError(error.message || "Something went wrong, please try again");
  }
};

export const ApiTryCatch = async (fn, fnName, ) => {
  try {
    const result = await fn();
    return result;
  } catch (error) {
    console.error("PRISMA ERROR:", error);
    console.error("ERROR AT:" , fnName); 
    console.error("CODE:", error?.code);
    console.error("META:", error?.meta);
    console.error("MESSAGE:", error?.message);
    return resError(error.message || "Something went wrong, please try again", null, 500, true);
  }
};

