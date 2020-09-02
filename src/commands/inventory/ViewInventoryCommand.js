const BaseCommand = require('../../utils/structures/BaseCommand');
const Items = require('../../database/schemas/Items');
const Discord = require('discord.js');

module.exports = class ViewInventoryCommand extends BaseCommand {
  constructor() {
    super('view', 'inventory', []);
  }

  async run(client, message, args, owner = null) {
    try {
      let ownerId, guildId;
      if(!owner) owner = args[0];
      guildId = message.guild.id
      if(owner && (owner === '-self' || owner === 'self')){
        owner = 'self'
        ownerId = message.member.id
      } else {
        owner = 'group'
      }
      if(owner != 'group' && owner != 'self') return message.channel.send("Invalid owner type");
      const items  = await Items.find({ownerType: owner, guildId: guildId, ownerId: ownerId })
      if(items){
        const messageOut = new Discord.MessageEmbed()
        if(owner === 'group') messageOut.setTitle('Group Inventory');
        else messageOut.setTitle(`${message.author.username}'s Inventory`);
        items.forEach(item => {
          messageOut.addFields({name:`${item.name}`, value:`${item.quantity}`})
        });
        message.channel.send(messageOut);
      }

    } catch (err) {
      console.error(err)
      message.channel.send("It seems an error has occured :(")
    }
  }
}