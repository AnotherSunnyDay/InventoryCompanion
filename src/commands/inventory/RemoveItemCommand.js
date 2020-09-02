const BaseCommand = require('../../utils/structures/BaseCommand');
const Items = require('../../database/schemas/Items');
const NamingHelper = require('../../helpers/ItemName');

module.exports = class RemoveItemCommand extends BaseCommand {
  constructor() {
    super('remove', 'inventory', ['delete']);
  }

  async run(client, message, args) {
    try {
      let quantity=1,owner='group', ownerId, guildId;

      const qIndex = args.indexOf('-q');
      if(qIndex > 0) quantity = args[qIndex +1];
      const aIndex = args.indexOf('-all');

      const oIndex = args.indexOf('-self');
      if(oIndex > 0) owner = 'self';

      if(owner != 'group' && owner != 'self') return message.channel.send("invalid group type");
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
        if(aIndex < 0) newQuanity = item.quantity - parseInt(quantity);
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
    }
  }
}