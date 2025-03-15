import { authRoom, setEmail, setName, setPin } from "@/chores/rooms";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
type tParams = Promise<{ roomNr: string }>;
export async function POST(req: Request, { params }: { params: tParams }) {
  try {
    const { email, name, pin } = await req.json();
    const { roomNr } = await params;
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
