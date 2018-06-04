import {Component, Prop, State} from '@stencil/core';
import {RouterHistory} from '@stencil/router';
import {SuperLoginService} from "../superlogin-service-injector/superlogin.service";
import {RxDBService} from "../../common/services/rxdb.service";
import {CommonComponent} from "../../common/classes/CommonComponent";

@Component({
  tag: 'user-login',
  styleUrl: 'user-login.scss'
})
export class UserLogin extends CommonComponent {
  @Prop() history: RouterHistory;
  @State() username: string = '';
  @State() password: string = '';


  async login() {
    await SuperLoginService.login(this.username, this.password);
    await RxDBService.init();
    // this.nav.replace('/', {});
  }

  componentWillLoad() {
    super.componentWillLoad();
  }

  launchSignup() {
    // this.history.push('/registration', {})
    // this.navCtrl.push('user-registration', {});
  }

  render() {
    return [
      <ion-content padding>
        <ion-row class="login-logo">
          <ion-col><img src="http://placehold.it/100x100"/></ion-col>
        </ion-row>
        <ion-row class="login-form">
          <ion-col>
            <ion-list lines={'inset'}>
              <ion-item>
                <ion-label>
                  <ion-icon name="person"></ion-icon>
                </ion-label>
                <ion-input onInput={(e) => this.handleInputChange('username', e)} placeholder="username"
                           type="text"></ion-input>
              </ion-item>
              <ion-item>
                <ion-label>
                  <ion-icon name="lock"></ion-icon>
                </ion-label>
                <ion-input onInput={(e) => this.handleInputChange('password', e)} placeholder="password"
                           type="password"></ion-input>
              </ion-item>
            </ion-list>
            <ion-button onClick={() => this.login()} color="primary" class="login-button">Login</ion-button>
          </ion-col>
        </ion-row>

        <ion-row>
          <ion-col>
            <button onClick={() => this.launchSignup()} class="create-account">Create an Account</button>
          </ion-col>
        </ion-row>
      </ion-content>
    ];
  }
}
