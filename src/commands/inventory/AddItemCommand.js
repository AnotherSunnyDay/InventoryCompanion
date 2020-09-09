const BaseCommand = require('../../utils/structures/BaseCommand');
const Items = require('../../database/schemas/Items');
const {NamingHelper, IndexHelper} = require('../../helpers/HelperFunctions');

module.exports = class AddItemCommand extends BaseCommand {
  constructor() {
    super('add', 'inventory', ['a']);
  }

  async run(client, message, args) {
    //message.channel.send(`Name: ${args[0]}   Value: ${value[0]}${value[1]}     Weight: ${weight[0]}${weight[1]}`); 
    try {
      let owner='group', guildId, ownerId, quantity =1;
      
      let name = NamingHelper(args);
      if(name === '') return message.channel.send("No Item given :(");

      const qntytest = /(-)([0-9])+/g;
      let breaker = true;
      args.forEach(arg => {
        if(qntytest.test(arg) && breaker){
          quantity = arg.slice(1);
        }
      });


      if(IndexHelper(args, "-self")) owner = 'self';

      if(owner != 'group' && owner != 'self') return message.channel.send("invalid group type");
      if(owner=== 'self') ownerId = message.member.id;
      guildId = message.guild.id;

      let item = await Items.findOne({ ownerType: owner, guildId:guildId, ownerId: ownerId, name: name });
      if(item){
        item = await Items.findOneAndUpdate({ ownerType: owner, guildId:guildId, ownerId: ownerId, name: name  }, {
          quantity: item.quantity + parseInt(quantity)
        });
      } else {
        const item = await Items.create({
          ownerType: owner,
          guildId:guildId,
          ownerId: ownerId,
          name: name,
          quantity: quantity,
        })
      }
      
      console.log("Item(s) has been added to the inventory")
      message.channel.send("Your Items have been added to your inventory.");
      const command = client.commands.get('view');
      command.run(client, message, args, owner);
    } catch (err) {
      message.channel.send("It seems an error has occured :(")
      console.log(err)
    }
  }
}