import { CHORE_LIST, getDeadline, getWeek } from "@/chores/chores";
import { getEmail, getName } from "@/chores/rooms";
import { StandardEmail } from "@/emails/standard_email";
import { render } from "@react-email/components";
import { differenceInCalendarDays } from "date-fns";
import { Resend } from "resend";

async function sendEmail(
  resend: Resend,
  roomNr: string,
  task: string,
  timeLeft: number,
  reminder?: boolean
) {
  const email = await getEmail(roomNr);
  const week = await getWeek();
  if (!email) return;
  const name = (await getName(roomNr)) ?? roomNr;
  const { data, error } = await resend.emails.send({
    from: "Your house <hello@tdaniel.dev>",
    to: [email],
    subject: `Your weekly chores - week ${week + 1}`,
    react: (
      <StandardEmail
        tenantName={name}
        taskName={task}
        timeLeft={timeLeft}
        reminder={reminder}
      />
    ),
  });
}
async function sendWeekly(
  resend: Resend,
  diff: number,
  opts?: { reminder?: boolean; lastDay?: boolean }
) {
  const { reminder, lastDay } = opts ?? {};
  let weekNr = await getWeek();
  if (lastDay) weekNr--;
  if (weekNr < 0) return;
  const chore_list = CHORE_LIST;
  const currChores = chore_list[weekNr % chore_list.length];
  for (const [chore, roomNr] of Object.entries(currChores)) {
    console.log("sending email:", roomNr, chore, diff);
    await sendEmail(resend, roomNr, chore, diff, reminder);
  }
}
export async function GET(req: Request) {
  // if (
  //   req.headers.get("Authorization") !== `Bearer ${process.env.CRON_SECRET}`
  // ) {
  //   return new Response(JSON.stringify({ error: "fuck off " }), {
  //     status: 401,
  //   });
  // }
  const deadline = await getDeadline();
  let diff = differenceInCalendarDays(deadline, new Date());
  // if (diff !== 1 && diff !== 5 && diff !== 14) {
  //   return new Response(JSON.stringify({ error: "Not today: ", diff }), {
  //     status: 500,
  //   });
  // }

  const resend = new Resend(process.env.EMAIL_API_KEY);

  try {
    if (diff === 14) {
      await sendWeekly(resend, 0, { lastDay: true, reminder: true });
      await sendWeekly(resend, diff);
    } else {
      await sendWeekly(resend, diff, { reminder: true });
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
