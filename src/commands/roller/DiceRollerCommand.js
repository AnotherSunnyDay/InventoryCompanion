const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class DiceRollerCommand extends BaseCommand {
  constructor() {
    super('role', 'roller', []);
  }

  run(client, message, arg) {
    try {
      const [... args] = arg.split('');
      let numbofdice='', die='', modifier='', mod=false, d=false;
      args.forEach(arg => {
          if(d){
            die+=arg
          }
          if(arg === 'd' )d = true;
          if(!d && !mod){
            numbofdice+=arg
          }


          if( arg === '+' || arg === '-') mod = true;
          if(mod){
            modifier+=arg
          }
      })
      if(numbofdice === '') numbofdice = 1;

      // message.channel.send(`You want to roll ${numbofdice}  d  ${die} and modify it with ${modifier}`)
      numbofdice = parseInt(numbofdice)
      die = parseInt(die)
      modifier = parseInt(modifier)

      let stringout='', total=0;
      for(let i = 0; i<numbofdice; i++){
        let thisrole = Math.floor(Math.random() * die);  
        total += thisrole
        stringout += `(${thisrole}) + `
      }
      stringout = stringout.slice(0, -2);
      if(modifier){
        total += modifier;
        stringout +=` + (${modifier})`
      }
      const messageOut = new Discord.MessageEmbed().addFields({name:total, value:stringout})
      message.channel.send(messageOut);
    } catch (err) {
      console.error(err)
    }

    
  }
}