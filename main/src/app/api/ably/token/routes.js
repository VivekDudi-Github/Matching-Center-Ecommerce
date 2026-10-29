import { NextResponse } from "next/server";
import * as Ably from "ably";
import { auth } from "@/auth";

export const runtime = "nodejs";

const ably = new Ably.Rest({
  key: process.env.ABLY_ROOT_KEY,
});

export async function GET() {
  try {
    const session = await auth();
    const customerId = session?.user?.id;

    if (!customerId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const isEligible = await prisma.order.findFirst({
      where: {
        customerId,
        reverseAt: {
          lte: new Date(),
        }
      }
    })

    if(!isEligible){
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const channelName = `customer:${customerId}:notifications`;

    const tokenRequest = await ably.auth.createTokenRequest({
      clientId: `customer-${customerId}`,
      capability: JSON.stringify({
        [channelName]: ["subscribe"],
      }),
    });

    return NextResponse.json(tokenRequest);
  } catch (error) {
    console.error("Ably token generation failed:", error);

    return NextResponse.json(
      { error: "Unable to establish notifications" },
      { status: 500 }
    );
  }
}