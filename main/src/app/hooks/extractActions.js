export const exfn = async (fn) => {
  try {
    const result = await fn();
    if(result?.success) return result.data;
    throw new Error(result?.message);
  } catch (error) {
    throw error;
  }
};