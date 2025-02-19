import Redis from "ioredis";

const redis = new Redis({
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: process.env.REDIS_PORT || 6379,
});

const handleDelete = async (id) => {
  await Cocktail.findByIdAndDelete(id);
  await redisClient.del('cocktails'); // Clear cached data
};


redis.on("connect", () => console.log("Connected to Redis"));
redis.on("error", (err) => console.error("Redis connection error:", err));

export default redis;
