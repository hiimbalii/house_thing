import { authRoom, getEmail, getName, needsAuth } from "@/chores/rooms";
import { BackButtonWrapper } from "@/components/main/back";
import ResponsiveContainer from "@/components/main/centered";
import {
  LoginContainer,
  SetPinContainer,
} from "@/components/rooms/auth_container";
import { RoomForm } from "@/components/rooms/room-form";
import { getCookie, getCookies } from "cookies-next";
import { cookies } from "next/headers";

export default async function EditInfo({
  params,
}: {
  params: Promise<{ roomNumber: string }>;
}) {
  const { roomNumber } = await params;
  const storedPin = (await cookies()).get("pin")?.value;

  const isNeedAuth = await needsAuth(roomNumber);
  const isAuthOk =
    !isNeedAuth ||
    (isNeedAuth && storedPin && (await authRoom(roomNumber, storedPin)));

  console.log(storedPin);
  if (!isAuthOk) {
    return (
      <ResponsiveContainer>
        <LoginContainer />
      </ResponsiveContainer>
    );
  }
  if (!isNeedAuth) {
    return (
      <ResponsiveContainer>
        <SetPinContainer />
      </ResponsiveContainer>
    );
  }

  const name = await getName(roomNumber);
  const email = await getEmail(roomNumber);
  console.log(name, email);
  return (
    <BackButtonWrapper>
      <ResponsiveContainer>
        <RoomForm email={email} name={name} />
      </ResponsiveContainer>
    </BackButtonWrapper>
  );
}
