const BaseCommand = require('../../utils/structures/BaseCommand');
const Items = require('../../database/schemas/Items')

module.exports = class AddItemCommand extends BaseCommand {
  constructor() {
    super('add', 'inventory', []);
  }

  async run(client, message, args) {
    //message.channel.send(`Name: ${args[0]}   Value: ${value[0]}${value[1]}     Weight: ${weight[0]}${weight[1]}`); 
    try {
      let endofitem=0, name='',quantity=1,owner='group', id;
      args.forEach((arg, index) => {
        if(endofitem <= 0){
          if(arg.startsWith("-")) endofitem = index-1;
        }
      });

      if(endofitem <= 0) endofitem = args.length -1;

      for(let i = 0; i<=endofitem; i++){
        name += args[i] + " ";
      }
      name = name.slice(0, -1); 
      if(name === '') return message.channel.send("No Item given :(");

      const qIndex = args.indexOf('-q');
      if(qIndex > 0) quantity = args[qIndex +1];

      const oIndex = args.indexOf('-o');
      if(oIndex > 0) owner = args[oIndex +1];

      if(owner != 'group' && owner != 'self') return message.channel.send("invalid group type");
      if(owner=== 'self') id = message.member.id;
      else id = message.guild.id;

      let item = await Items.findOne({ ownerType: owner, ownerId: id, name: name });
      if(item){
        item = await Items.findOneAndUpdate({ ownerType: owner, ownerId: id, name: name }, {
          quantity: item.quantity + parseInt(quantity)
        });
      } else {
        const item = await Items.create({
          ownerType: owner,
          ownerId: id,
          name: name,
          quantity: quantity,
        })
      }
      
      console.log("Item(s) has been added to the inventory")
      message.channel.send("Your Items have been added to your inventory.");
      const command = client.commands.get('view');
      command.run(client, message, args, owner);
    } catch (err) {
      message.channel.send("An error has occured, items not added.");
      console.log(err)
    }
  }
}