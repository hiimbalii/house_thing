import { authRoom, setPin } from "@/chores/rooms";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { roomNr, pin } = await req.json();
    if (!roomNr || !pin) {
      return NextResponse.json(
        { error: "Missing parameters" },
        { status: 400 }
      );
    }

    await setPin(roomNr, pin);
    (await cookies()).set("pin", pin, { maxAge: 7 * 24 * 60 * 60 });
    (await cookies()).set("roomNr", roomNr, { maxAge: 7 * 24 * 60 * 60 });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to set PIN" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { roomNr, pin } = await req.json();
    if (!roomNr || !pin) {
      return NextResponse.json(
        { error: "Missing parameters" },
        { status: 400 }
      );
    }

    if (!(await authRoom(roomNr, pin))) {
      console.log(roomNr, pin);
      throw new Error("failed to auth");
    }

    (await cookies()).set("pin", pin, { maxAge: 7 * 24 * 60 * 60 });
    (await cookies()).set("roomNr", roomNr, { maxAge: 7 * 24 * 60 * 60 });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
