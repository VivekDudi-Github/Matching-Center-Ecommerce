import { NextResponse } from "next/server";
import * as Ably from "ably";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export const runtime = "nodejs";


export async function GET() {
  try {
    console.log("ably token get hit!");
        
    const session = await getServerSession(authOptions);
    const customerId = session?.user?.id;

    const ably = new Ably.Rest({
      key: process.env.ABLY_ROOT_KEY,
    });
    
    if (!customerId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // const isEligible = await prisma.order.findFirst({
    //   where: {
    //     customerId,
    //     reverseAt: {
    //       lte: new Date(),
    //     }
    //   }
    // })

    // if(!isEligible){
    //   return NextResponse.json(
    //     { error: "Unauthorized" },
    //     { status: 401 }
    //   );
    // }

    const channelName = `customer:${customerId}:notifications`;

    const tokenRequest = await ably.auth.createTokenRequest({
      clientId: `customer-${customerId}`,
      capability: JSON.stringify({
        [channelName]: ["subscribe"],
      }),
    });

    const token = await ably.auth.requestToken(tokenRequest);

    return NextResponse.json(token);
  } catch (error) {
    console.error("Ably token generation failed:", error);

    return NextResponse.json(
      { error: "Unable to establish notifications" },
      { status: 500 }
    );
  }
}