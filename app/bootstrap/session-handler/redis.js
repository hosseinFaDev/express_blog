module.exports = (session) => {
    const { createClient } = require("redis");
    let redisClient = createClient({ legacyMode: true });
    redisClient.connect().catch(console.error);
    return redisClient;

}