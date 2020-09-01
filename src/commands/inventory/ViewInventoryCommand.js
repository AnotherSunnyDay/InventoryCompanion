const BaseCommand = require('../../utils/structures/BaseCommand');
const Items = require('../../database/schemas/Items')

module.exports = class ViewInventoryCommand extends BaseCommand {
  constructor() {
    super('view', 'inventory', []);
  }

  async run(client, message, args) {
    try {
      let group = args[0], id;
      if(group && group === 'self'){
        id = message.member.id
      } else {
        id = message.guild.id
      }
      if(group != 'group' && group != 'self') return message.channel.send("invalid group type");
      itesms  = await Items.find({ownerType: group}, {ownerId: id})
      if(items){
        let messageout = '';
        items.forEach(item => {
          messageout += `${item.name}: ${item.quantity} <b>`
        });
      }

    } catch (err) {
      console.error(err)
    }
  }
}