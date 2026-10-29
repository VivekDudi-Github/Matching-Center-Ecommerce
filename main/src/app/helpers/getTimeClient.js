import { getTimeServer } from "./GetTime";


export const getTimeClient = async () => {
  const t0 = Date.now(); 
  
  const data = await getTimeServer();
  
  
  const t1 = data; 
  
  const t2 = Date.now(); 

  const rtt = t2 - t0; // round-trip-time

  const correctedServerTime = t1 + (rtt / 2);

  return correctedServerTime; 
}