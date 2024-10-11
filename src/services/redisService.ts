import RedisStore from "connect-redis";
import Redis from "ioredis";

const redis = new Redis();
export const redisClient =new RedisStore({client: redis});