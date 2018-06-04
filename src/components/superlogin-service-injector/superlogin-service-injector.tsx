import {Component, Method} from '@stencil/core';
import {SuperLoginServiceClass} from "./superlogin.service";
const superloginService = new SuperLoginServiceClass();
@Component({
  tag: 'superlogin-service-injector'
})
export class DataServiceInjector  {
  @Method()
  create(): Promise<any> {
    return new Promise(resolve => {
      resolve(superloginService);
    });
  }
}
