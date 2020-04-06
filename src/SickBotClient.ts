import { Client } from 'discord.js';
import moment from 'moment'

class SickBotClient extends Client {
  constructor(token: string | undefined){
    super();
    super.login(token)
      .then(item => item)
      .catch(err => console.log(err));
  }
}

export { SickBotClient };