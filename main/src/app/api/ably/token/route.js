import { NextResponse } from "next/server";
import * as Ably from "ably";
import { ApiTryCatch } from "@/app/helpers/TryCatch";
import { requireUser } from "@/app/helpers/auth";
import { resSuccess } from "@/app/helpers/resObj";

export const runtime = "nodejs";


export async function GET() {
  return ApiTryCatch(async (user) => {
    console.log("ably token get hit!");

    const ably = new Ably.Rest({
      key: process.env.ABLY_ROOT_KEY,
    });

    const customerId = user.id;

    const channelName = `customer:${customerId}:notifications`;

    const tokenRequest = await ably.auth.createTokenRequest({
      clientId: `customer-${customerId}`,
      capability: JSON.stringify({
        [channelName]: ["subscribe"],
      }),
    });

    const token = await ably.auth.requestToken(tokenRequest);

    return resSuccess(token, 200, true);
  }, "getAblyToken", requireUser);
}