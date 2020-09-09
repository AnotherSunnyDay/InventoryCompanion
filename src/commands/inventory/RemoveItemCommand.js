const BaseCommand = require('../../utils/structures/BaseCommand');
const Items = require('../../database/schemas/Items');
const {NamingHelper, IndexHelper} = require('../../helpers/HelperFunctions');

module.exports = class RemoveItemCommand extends BaseCommand {
  constructor() {
    super('remove', 'inventory', ['delete', 'r', 'd']);
  }

  async run(client, message, args) {
    try {
      let owner = 'group', ownerId, guildId, quantity = 1;

      const qntytest = /(-)([0-9])+/g;
      let breaker = true;
      args.forEach(arg => {
        if(qntytest.test(arg) && breaker){
          quantity = arg.slice(1);
        }
      });

      const all = IndexHelper(args, "-all");

      if(IndexHelper(args, "-self")) owner = 'self';


      if(owner != 'group' && owner != 'self') return message.channel.send("Invalid group type");
      if(owner=== 'self') ownerId = message.member.id;
      guildId = message.guild.id;

      if(args[0] === "-ALL"){
        let items = await Items.deleteMany({ ownerType: owner, guildId: guildId, ownerId: ownerId});
        message.channel.send("All Your Shit Was Deleted");
      }
      else{
        let name = NamingHelper(args);
        if(name === '') return message.channel.send("No Item given :(");

        let item = await Items.findOne({ ownerType: owner, guildId: guildId, ownerId: ownerId, name: name });
        if(!item) return message.channel.send("That item does not exist")

        let newQuanity;
        if(!all) newQuanity = item.quantity - parseInt(quantity);
        else newQuanity = 0;
        if(newQuanity <= 0){
          item = await Items.findOneAndDelete({ ownerType: owner, guildId: guildId, ownerId: ownerId, name: name });
          message.channel.send("Item has been removed from your inventory")
        }
        else{
          item = await Items.findOneAndUpdate({ ownerType: owner, guildId: guildId, ownerId: ownerId, name: name }, {
            quantity: newQuanity
          });
        }
      }


      const command = client.commands.get('view');
      command.run(client, message, args, owner);


    } catch (err) {
      console.error(err)
      message.channel.send("It seems an error has occured :(")
    }
  }
}