import ratelimiter from "../config/upstash.js";
const rateLimiter = async (req, res, next) => {
  try {
    const key = req.ip || "global";
    const { success } = await ratelimiter.limit(key);
    if (!success) {
      return res
        .status(429)
        .json({ Message: "Too many reguest please try again latrer" });
    }
    next();
  } catch (error) {
    console.error("ratelimiter crashed", error);
    next(error);
  }
};
export default rateLimiter;
