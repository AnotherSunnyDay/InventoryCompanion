const BaseCommand = require('../../utils/structures/BaseCommand');
const Items = require('../../database/schemas/Items');
const Discord = require('discord.js');

module.exports = class ViewInventoryCommand extends BaseCommand {
  constructor() {
    super('view', 'inventory', []);
  }

  async run(client, message, args, owner = null) {
    try {
      let id;
      if(!owner) owner = args[0];
      if(owner && owner === 'self'){
        id = message.member.id
      } else {
        owner = 'group'
        id = message.guild.id
      }
      if(owner != 'group' && owner != 'self') return message.channel.send("Invalid owner type");
      const items  = await Items.find({ownerType: owner, ownerId: id })
      if(items){
        const messageOut = new Discord.MessageEmbed()
        if(owner === 'group') messageOut.setTitle('Group Inventory');
        else messageOut.setTitle('Your Inventory');
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