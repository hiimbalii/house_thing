import { add, differenceInCalendarDays, parse } from "date-fns";
import { createClient } from "redis";

const redis = await createClient({
  url: process.env.REDIS_URL,
}).connect();
export const getWeek = async (startDate?: Date): Promise<number> =>
  Math.max(
    Math.floor(
      differenceInCalendarDays(
        new Date(),
        startDate ?? (await getStartDate())
      ) / 14
    ),
    0
  );

export const getStartDate = async (): Promise<Date> => {
  const startStr = await redis.get("start_date");
  if (!startStr) throw Error("Set start_date");
  return parse(startStr, "yyyy-MM-dd", new Date());
};

export const getDeadline = async () => {
  const startDate = await getStartDate();
  const weekNr = await getWeek(startDate);
  return add(startDate, { weeks: (weekNr + 1) * 2 });
};
export const CHORE_LIST = [
  { shower: "354", toilet: "353", "sink room": "352", hallway: "351" },
  { shower: "350", toilet: "354", "sink room": "349", hallway: "353" },
  { shower: "352", toilet: "351", "sink room": "350", hallway: "349" },
];
