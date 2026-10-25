import "server-only";
import * as Ably from "ably";


export const ablyServer = new Ably.Rest({
  key: process.env.ABLY_ROOT_KEY,
});
