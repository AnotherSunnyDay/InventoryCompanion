const BaseCommand = require('../../utils/structures/BaseCommand');
const Items = require('../../database/schemas/Items')

module.exports = class AddItemCommand extends BaseCommand {
  constructor() {
    super('additem', 'inventory', []);
  }

  async run(client, message, args) {
    let group, id;
    if(args[2] && args[2] === 'self'){
      group = "self";
      id = message.member.id
    } else {
      group = 'group';
      id = message.guild.id
    }
    //message.channel.send(`Name: ${args[0]}   Value: ${value[0]}${value[1]}     Weight: ${weight[0]}${weight[1]}`);
    message.channel.send(`Group ${group}; ID: ${id}`)
    try {
      const item = await Items.create({
        ownerType: group,
        ownerId: id,
        name: args[0],
        quantity: args[1],
      })
      console.log("Item has been added to the inventory")
    } catch (err) {
      console.log(err)
    }
  }
}