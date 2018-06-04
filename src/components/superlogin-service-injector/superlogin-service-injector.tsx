import {Component, Method} from '@stencil/core';

@Component({
  tag: 'data-service-injector'
})
export class DataServiceInjector  {
  @Method()
  create(): Promise<any> {
    return new Promise(resolve => {
      resolve({});
    });
  }
}
