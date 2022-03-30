const redis = require('redis');

const client = redis.createClient();

client.on("connect", function () {
    console.log("redis connected");
});

client.on("error", (error)=>{
    console.log(error);
});

module.exports = client;

