import { Client } from 'discord.js';
import moment from 'moment'

class SickBotClient extends Client {
  constructor(token: any){
    super();
    super.login(token)
      .then(item => item)
      .catch(err => console.log(err));
  }

  public getTime() {
    return moment(Date.now())
      .toString()
      .split(" ")
      .splice(0, 5)
  };
}

export { SickBotClient };