// import "server-only";
// import { NextResponse } from "next/server";
// import * as Ably from "ably";
// import { getServerSession } from "next-auth";


// export async function GET(request) {
//   const user = await getServerSession();

//   const { searchParams } = new URL(request.url);
//   const attemptId = searchParams.get("attemptId");

//   if (!attemptId) {
//     return NextResponse.json(
//       { error: "Missing attemptId" },
//       { status: 400 }
//     );
//   }

//   // Verify this user owns or is authorized to view the attempt.
//   const attempt = await getPaymentAttempt(attemptId, user.id);

//   if (!attempt) {
//     return NextResponse.json(
//       { error: "Payment attempt not found" },
//       { status: 404 }
//     );
//   }

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