import { createClient } from "redis";

const redis = await createClient({
  url: process.env.REDIS_URL,
}).connect();

export const redisGet = () => redis.get("key");

export const authRoom = async (roomNr: string, pin: string) =>
  (await redis.get(`${roomNr}_pin`)) === pin;

export const needsAuth = async (roomNr: string) =>
  !!(await redis.get(`${roomNr}_pin`));

export const setPin = async (roomNr: string, pin: string) =>
  await redis.set(`${roomNr}_pin`, pin);

export const setName = async (roomNr: string, name: string) =>
  await redis.set(`${roomNr}_name`, name);
export const setEmail = async (roomNr: string, email: string) =>
  await redis.set(`${roomNr}_email`, email);

export const getName = async (roomNr: string) =>
  (await redis.get(`${roomNr}_name`)) ?? undefined;
export const getEmail = async (roomNr: string) =>
  (await redis.get(`${roomNr}_email`)) ?? undefined;
