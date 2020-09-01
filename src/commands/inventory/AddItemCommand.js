const BaseCommand = require('../../utils/structures/BaseCommand');
const Items = require('../../database/schemas/Items')

module.exports = class AddItemCommand extends BaseCommand {
  constructor() {
    super('additem', 'inventory', []);
  }

  async run(client, message, args) {
    //message.channel.send(`Name: ${args[0]}   Value: ${value[0]}${value[1]}     Weight: ${weight[0]}${weight[1]}`);
    try {
      let group = args[2], id, name=args[0], quantity =args[1];
      if(group && group === 'self'){
        id = message.member.id
      } else {
        group = 'group'
        id = message.guild.id
      }
      if(group != 'group' && group != 'self') return message.channel.send("invalid group type");

      item = await Items.findOne({ ownerType: group }, { ownerId: id} , { name: name });
      if(item){
        item.quantity = item.quantity + quantity
        await item.save()
      } else {
        const item = await Items.create({
          ownerType: group,
          ownerId: id,
          name: name,
          quantity: quantity,
        })
      }
      console.log("Item(s) has been added to the inventory")
    } catch (err) {
      console.log(err)
    }
  }
}