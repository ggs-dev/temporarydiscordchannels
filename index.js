const Discord = require("discord.js");
const bot = new Discord.Client;

bot.on("voiceStateUpdate", (oldState, newState) => {
    
    //Checking users new voice channel state and if the left channel has 0 members left.
  
    if(newState.channel == null){
      let leftChannel = newState.guild.channels.cache.find(c => c.name === `Personal Channel - ${oldState.channel.id}`)
      
      if (leftChannel == null) return;
      
      if(leftChannel.members.size == 0){
      return leftChannel.delete();
    } else return;
  }
  
    // The channel the user has to join to get moved into their own channel
    if(newState.channel.id == 'YOUR "CREATE CHANNEL" ID'){
  
    // The initial channel creation and sending it to the correct category
      let userID = newState.guild.members.cache.get(newState.id)

       newState.guild.channels.create(`Personal Channel - ${newState.id}`, { type: 'voice'}).then(channel => {
         
        let category = newState.guild.channels.cache.find(c => c.name == 'YOUR CATEGORY NAME' && c.type == 'category')

         channel.setParent(category.id)

        newState.guild.member(userID).voice.setChannel(channel.id)

        return channel.setName(`Personal Channel - ${channel.id}`)
       })

      //Checking users old state      
      } 
      if(oldState.channel == null) return;
      else if(newState.channel.name !== `Personal Channel - ${oldState.channel.id}`){
          let leftChannel = newState.guild.channels.cache.find(c => c.name === `Personal Channel - ${oldState.channel.id}`)
          
          if (leftChannel == null) return;
          
          if(leftChannel.members.size == 0){
            return leftChannel.delete();
          } else return;
         } 

      //Misc checks to make sure that muting their mic or streaming etc doesn't remove them from the channel
         if(newState.streaming == true){
            return;
         }else if (oldState.streaming == true) return;

         if(newState.selfDeaf == true){
          return;
       }else if (oldState.selfDeaf == true) return;

        if(newState.selfMute == true){
          return;
      }else if (oldState.selfMute == true) return;

        if(newState.serverMute == true){
        return;
      }else if (oldState.serverMute == true) return;

        if(newState.serverDeaf == true){
        return;
      }else if (oldState.serverDeaf == true) return;

      if(newState.selfVideo == true){
        return;
      }else if (oldState.selfVideo == true) return;

         if(oldState.channel == null){
          return;
        }

    // Final older state checking
        if(oldState.channel.name == `Personal Channel - ${oldState.channel.id}`){
        
          let leftChannel = oldState.guild.channels.cache.find(c => c.name === `Personal Channel - ${oldState.channel.id}`)
        
          if (leftChannel == null) return;

          if(leftChannel.members.size == 0){
            return leftChannel.delete();
          } else return;
        }
  })

bot.login("YOUR DISCORD TOKEN")
