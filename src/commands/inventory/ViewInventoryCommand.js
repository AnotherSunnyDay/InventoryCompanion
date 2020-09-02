const BaseCommand = require('../../utils/structures/BaseCommand');
const Items = require('../../database/schemas/Items');
const Discord = require('discord.js');

module.exports = class ViewInventoryCommand extends BaseCommand {
  constructor() {
    super('view', 'inventory', []);
  }

  async run(client, message, args, group = null) {
    try {
      if(!group) group = args[0];
      let id;
      if(group && group === 'self'){
        id = message.member.id
      } else {
        group = 'group'
        id = message.guild.id
      }
      if(group != 'group' && group != 'self') return message.channel.send("invalid group type");
      const items  = await Items.find({ownerType: group, ownerId: id })
      if(items){
        const messageOut = new Discord.MessageEmbed()
        .setTitle('Your Inventory');
        items.forEach(item => {
          messageOut.addFields({name:`${item.name}`, value:`${item.quantity}`})
        });
        message.channel.send(messageOut);
      }

    } catch (err) {
      console.error(err)
    }
  }
}