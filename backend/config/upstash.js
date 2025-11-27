import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"
//configured the imports from dotenv at import
//still dont quite know how the order is working
//import dotenv from "dotenv";
//dotenv.config();
console.log("i have configed the dotenv in upstash.js");

// Create a ratelimiter that lets 10 requests per 20 seonds
const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(10, "20 s"),
});

export default ratelimit;