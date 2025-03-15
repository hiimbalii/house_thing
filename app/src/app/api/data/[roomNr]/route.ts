import { authRoom, setEmail, setName, setPin } from "@/chores/rooms";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { roomNr: string } }
) {
  try {
    const { email, name, pin } = await req.json();
    const { roomNr } = params;
    if (pin && pin !== "") {
      await setPin(roomNr, pin);
      (await cookies()).set("pin", pin, { maxAge: 7 * 24 * 60 * 60 });
    }
    await setEmail(roomNr, email);
    await setName(roomNr, name);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to set PIN" }, { status: 500 });
  }
}
