import { resError } from "./resObj";

export const TryCatch = async (fn, authCheck) => {
  try {
    let user = null;
    if(authCheck) user = await authCheck();

    const result = await fn(user);
    return result;
  } catch (error) {
    console.error("PRISMA ERROR:", error);
    console.error("CODE:", error?.code);
    console.error("META:", error?.meta);
    console.error("MESSAGE:", error?.message);
    if(error?.message === "FORBIDDEN") {
      return resError("You are not authorized to perform this action", null, 403, true);
    }
    if(error?.message === "UNAUTHORIZED") {
      return resError("You are not authorized to perform this action", null, 401, true);
    }
    return resError(error?.message || "Something went wrong, please try again");
  }
};

export const ApiTryCatch = async (fn, fnName,authCheck ) => {
  try {
    let user = null;
    if(authCheck) user = await authCheck();

    const result = await fn(user);
    return result;
  } catch (error) {
    console.error("ERROR AT:" , fnName); 
    console.error("PRISMA ERROR:", error);
    console.error("CODE:", error?.code);
    console.error("META:", error?.meta);
    console.error("MESSAGE:", error?.message);
    if(error?.message === "FORBIDDEN") {
      return resError("You are not authorized to perform this action", null, 403, true);
    }
    if(error?.message === "UNAUTHORIZED") {
      return resError("You are not authorized to perform this action", null, 401, true);
    }
    return resError(error?.message || "Something went wrong, please try again", null, 500, true);
  }
};

