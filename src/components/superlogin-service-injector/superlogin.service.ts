import {SuperloginConfig} from "../../common/config/superlogin.prod";

export class SuperLoginServiceClass {
  url: string;
  constructor() {
    this.url = SuperloginConfig.host;
    if (SuperloginConfig.port) {
      this.url += `:${SuperloginConfig.port}`;
    }
  }

  async login(username, password) {
    const headers: any = {'Content-Type': 'application/json'};
    const credentials = { username, password };
    try {
      const data = await fetch(`${this.url}/auth/login`, {
        method: 'POST',
        // mode: 'no-cors',
        cache: 'no-cache',
        headers: headers,
        body: JSON.stringify(credentials)
      });
      console.log(data);
    } catch (error) {
      console.log(error);
      return false;
    }
    return true;
  }
}
export const SuperLoginService: SuperLoginServiceClass = new SuperLoginServiceClass();
