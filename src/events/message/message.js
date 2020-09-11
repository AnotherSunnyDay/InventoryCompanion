const BaseEvent = require('../../utils/structures/BaseEvent');
const GuildConfig = require('../../database/schemas/GuildConfig');
module.exports = class MessageEvent extends BaseEvent {
  constructor() {
    super('message');
  }
  
  async run(client, message) {
    if (message.author.bot) return;
    const guildConfig = await GuildConfig.findOne({guildId: message.guild.id });
    const prefix = "!";
    if (message.content.startsWith(prefix)) {
      const [cmdName, ...cmdArgs] = message.content
      .slice(prefix.length)
      .trim()
      .split(/\s+/);
      const regex = /([0-9]?)+d([0-9])+/g ;
      //if the cmdName meets pattern for dice roller
      if(regex.test(cmdName)){
        const command = client.commands.get('roll');
        command.run(client, message, cmdName, cmdArgs);
      }
      else {
        const command = client.commands.get(cmdName);
        if (command) {
          command.run(client, message, cmdArgs);
        }
      }
    }
  }
}