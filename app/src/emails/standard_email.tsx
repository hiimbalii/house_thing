import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Markdown,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import * as React from "react";
import { add, format, formatDistance } from "date-fns";
interface VercelInviteUserEmailProps {
  tenantName: string;
  taskName: string;
  timeLeft: number;
  reminder?: boolean;
}

export const StandardEmail = ({
  tenantName,
  taskName,
  timeLeft,
  reminder,
}: VercelInviteUserEmailProps) => {
  const previewText = reminder
    ? `You have ${timeLeft} day${timeLeft > 1 ? "s" : ""} to clean ${taskName}`
    : `New bi-weekly cleaning task: ${taskName}`;

  const CLUES = {
    "sink room": [
      "Clean both sinks with all-purpose cleaner.",
      "Clean both stands above the sinks and the cabinet below.",
      "Clean the space in front of the window.",
      "Clean the windowsill and the two racks on the wall.",
      "Clean the floor and dirty spots on the wall.",
    ],
    shower: [
      "Clean the shower head and the shower base. ",
      "Clean the tiles around the floor esp. with mold cleaner.",
      "Clean the floor of the shower and dirty spots on the tiles with hot water (mixed w all-purpose cleaner).",
      "Clean the rack with shampoo bottles.",
    ],
    toilet: [
      "First clean the toilet bowl, the toilet (beneath) itself.",
      'Then clean the toilet with "WC eend"/ toilet cleaner and let it stay for like 20 min or so (says on the packaging).',
      "Clean the sink, and beneath.",
      "Throw away the carton toilet paper rolls, clean the garbage bin with a wipe.",
      "Clean the floor and dirty spots on the wall with hot water (mixed w all-purpose cleaner).",
      'While your waiting for the "WC eend", clean the floor of our story/ verdieping (use vacuum cleaner and then hot water).',
    ],
    hallway: [
      "Sweep and mop the stairs (preferably both but at least the 1st one)",
      "If there are any random items that don't belong there toss them (like bags that go in the laundry room, stuff left on chairs, etc)",
      "Vacuum/sweep and mop the floor",
      "Clean the rugs (the common ones are fine - personals are up to u)",
      "Including the laundry room is up to your discretion - I don't think it's our floors duty",
      "You are done :) this week was easy",
    ],
  };

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              {reminder
                ? timeLeft > 0
                  ? `${timeLeft} day${timeLeft > 1 ? "s" : ""} left to clean!`
                  : "Cleaning deadline is today!"
                : `New cleaning task for you!`}
            </Heading>
            {timeLeft === 0 || timeLeft === 14 ? (
              <Text className="text-gray text-[14px] leading-[24px] italic">
                You may have recieved 2 emails today! make sure to doublecheck
              </Text>
            ) : null}
            <Text className="text-black text-[14px] leading-[24px]">
              Hello {tenantName},
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              Your cleaning task is:{" "}
              <span className="font-bold uppercase">{taskName}</span>
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              The deadline for this task is:{" "}
              <span className="font-bold">
                {format(add(new Date(), { days: timeLeft }), "MMMM dd. (EEE, ")}
                {timeLeft === 0
                  ? "today"
                  : formatDistance(
                      add(new Date(), { days: timeLeft }),
                      new Date(),
                      { addSuffix: true }
                    )}
                {")"}
              </span>
            </Text>
            <Text className="pt-2">Best regards, your roommates :)</Text>
          </Container>
          {CLUES[taskName as keyof typeof CLUES] && (
            <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
              <Section>
                {(CLUES[taskName as keyof typeof CLUES] ?? []).map((clue) => (
                  <Text
                    key={clue}
                    className="text-black text-[10px] leading-none"
                  >
                    - {clue}
                  </Text>
                ))}
              </Section>{" "}
            </Container>
          )}
        </Body>
      </Tailwind>
    </Html>
  );
};

StandardEmail.PreviewProps = {
  tenantName: "Daniel",
  taskName: "hallway",
  timeLeft: 14,
  // reminder: true,
} as VercelInviteUserEmailProps;

export default StandardEmail;
