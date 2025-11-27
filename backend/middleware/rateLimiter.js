import ratelimit  from "../config/upstash.js"

const ratelimiter = async (req, res, next) => {
    try {
        //currently the server is rate limited across all requests
        //for rate limiting for spesific users it would do something like this 
        //const { success } = await ratelimit.limit(userID);
        const { success } = await ratelimit.limit("my-limit-key");
        if(!success) {
            //Status 429 is for too many requests
            return res.status(429).json({
                message: "Too many requests, please wait before trying again"
            })
        }
        next();
    } catch (error) {
        console.log("Rate limit error", error);
        next(error);
    }
};

export default ratelimiter;