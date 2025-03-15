import { CHORE_LIST, getDeadline, getWeek, nextWeek } from "@/chores/chores";
import { getEmail, getName } from "@/chores/rooms";
import { StandardEmail } from "@/emails/standard_email";
import { render } from "@react-email/components";
import { differenceInCalendarDays } from "date-fns";
import { Resend } from "resend";

async function sendEmail(
  resend: Resend,
  roomNr: string,
  task: string,
  timeLeft: number
) {
  const email = await getEmail(roomNr);
  if (!email) return;
  // if (email !== "tcrbt1@gmail.com") {
  //   console.log("Not sending to", email);
  //   return;
  // }
  const name = (await getName(roomNr)) ?? roomNr;
  const { data, error } = await resend.emails.send({
    from: "Your house <hello@tdaniel.dev>",
    to: [email],
    subject: "Your weekly chores",
    react: (
      <StandardEmail tenantName={name} taskName={task} timeLeft={timeLeft} />
    ),
  });
}
async function sendWeekly(resend: Resend, diff: number) {
  const weekNr = await getWeek();
  const chore_list = CHORE_LIST;
  const currChores = chore_list[weekNr % chore_list.length];
  for (const [chore, roomNr] of Object.entries(currChores)) {
    console.log("sending email:", roomNr, chore, diff);
    await sendEmail(resend, roomNr, chore, diff);
  }
}
export async function POST(req: Request) {
  const deadline = await getDeadline();
  const diff = differenceInCalendarDays(deadline, new Date());
  if (diff !== 0 && diff !== 1 && diff !== 5 && diff !== 14 && diff !== 15) {
    return;
  }
  const resend = new Resend(process.env.EMAIL_API_KEY);

  try {
    await sendWeekly(resend, diff);
    if (diff === 0) {
      await nextWeek();
      await sendWeekly(resend, diff);
    }
    return new Response(
      JSON.stringify({ message: "Emails sent successfully" }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to send email" }), {
      status: 500,
    });
  }
}
