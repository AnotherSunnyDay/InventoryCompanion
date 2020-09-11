const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class HelpCommand extends BaseCommand {
  constructor() {
    super('help', 'help', []);
  }

  run(client, message, args) {
    const messageOut = new Discord.MessageEmbed()
    .setTitle("Commands")
    .setDescription("The Inventory Companion bot is a friend here to help you track your inventory. You have access to two inventories: your personal inventory, and your group inventory. Your personal inventory is tied specifically to you and no one else can make modifications to it, and is denoted by the '-self' option. Your group inventory is a shared inventory between everyone and anyone can make changes to it. It is the default inventory used if the '-self' option is not included. You can add, delete, and view items with the commands listed below")
    .addFields({name:"Add Item", value:"!add {item_name: required} [-{quantity}] [-self]"})
    .addFields({name:"Delete Item", value:"!remove/delete {item_name: required} [-{quantity}] [-all] [-self]"})
    .addFields({name:"View Items", value:"!view [-self]"});

    message.channel.send(messageOut);
  }
}