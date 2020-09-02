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
      if(quantity === 'self' || quantity === 'group'){
        group = quantity
        quantity = 1;
      }
      if(group && group === 'self'){
        id = message.member.id
      } else {
        group = 'group'
        id = message.guild.id
      }

      if(!quantity) quantity = 1;
      if(group != 'group' && group != 'self') return message.channel.send("invalid group type");

      let item = await Items.findOne({ ownerType: group, ownerId: id, name: name });
      if(item){
        item = await Items.findOneAndUpdate({ ownerType: group, ownerId: id, name: name }, {
          quantity: item.quantity + parseInt(quantity)
        });
      } else {
        const item = await Items.create({
          ownerType: group,
          ownerId: id,
          name: name,
          quantity: quantity,
        })
      }
      
      console.log("Item(s) has been added to the inventory")
      message.channel.send("Your Items have been added to your inventory.");
      const command = client.commands.get('view');
      command.run(client, message, args, group);
    } catch (err) {
      message.channel.send("An error has occured, items not added.");
      console.log(err)
    }
  }
}