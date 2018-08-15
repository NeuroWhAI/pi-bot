const publicip = require('public-ip');

module.exports = {
    name: 'ip',
    description: "Get server's public IP.",
    execute(msg, args) {
        publicip.v4().then(ip => {
            msg.channel.send(ip);
        });
    }
};