export const TryCatch = async (fn) => {
  try {
    const result = await fn();
    return result;
  } catch (error) {
    console.error("PRISMA ERROR:", error);
    console.error("CODE:", error?.code);
    console.error("META:", error?.meta);
    console.error("MESSAGE:", error?.message);
    return error;
  }
};