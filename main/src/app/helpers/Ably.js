// "use server";
// import { NextResponse } from "next/server";
// import * as Ably from "ably";
// import { getServerSession } from "next-auth";


// export async function getAblyToken() {
//   const user = await getServerSession();

//   const channel = `payment-attempt:${attempt.id}`;

//   const ably = new Ably.Rest({
//     key: process.env.ABLY_API_KEY,
//   });

//   const tokenRequest = await ably.auth.createTokenRequest({
//     clientId: `user-${user.id}`,
//     capability: JSON.stringify({
//       [channel]: ["subscribe"],
//     }),
//     ttl: 30 * 60 * 1000,
//   });

//   return NextResponse.json(tokenRequest);
// }