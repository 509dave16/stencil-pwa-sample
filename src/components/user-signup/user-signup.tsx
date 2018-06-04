import {Component, Prop} from '@stencil/core';
import {CommonComponent} from "../../common/classes/CommonComponent";
// import {SuperLoginService} from "../superlogin-service-injector/superlogin.service";
import {RxDBService} from "../../common/services/rxdb.service";
import {RouterHistory} from "@stencil/router";

@Component({
  tag: 'user-signup',
  styleUrl: 'user-signup.scss'
})
export class UserSignup extends CommonComponent {
  @Prop() history: RouterHistory;
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;

  async register() {
    // let user = {
    //   name: this.name,
    //   username: this.username,
    //   email: this.email,
    //   password: this.password,
    //   confirmPassword: this.confirmPassword
    // };
    // await SuperLoginService.SuperLoginClient.register(user);
    await RxDBService.init();
    // this.history.push('/', {});
  }

  render() {
    return [
      <ion-header>

        <ion-navbar color="secondary">
          <ion-title>Create Account</ion-title>
        </ion-navbar>

      </ion-header>,


      <ion-content padding>

        <ion-row class="account-form">
          <ion-col>
            <ion-list lines={'inset'}>

              <ion-item>
                <ion-label>
                  <ion-icon name="person"></ion-icon>
                </ion-label>
                <ion-input onInput={(e) => this.handleInputChange('name', e)} placeholder="Name"
                           type="text"></ion-input>
              </ion-item>

              <ion-item>
                <ion-label>
                  <ion-icon name="person"></ion-icon>
                </ion-label>
                <ion-input onInput={(e) => this.handleInputChange('username', e)} placeholder="Username"
                           type="text"></ion-input>
              </ion-item>

              <ion-item>
                <ion-label>
                  <ion-icon name="mail"></ion-icon>
                </ion-label>
                <ion-input onInput={(e) => this.handleInputChange('email', e)} placeholder="Email"
                           type="email"></ion-input>
              </ion-item>

              <ion-item>
                <ion-label>
                  <ion-icon name="lock"></ion-icon>
                </ion-label>
                <ion-input onInput={(e) => this.handleInputChange('password', e)} placeholder="Password"
                           type="password"></ion-input>
              </ion-item>

              <ion-item>
                <ion-label>
                  <ion-icon name="lock"></ion-icon>
                </ion-label>
                <ion-input onInput={(e) => this.handleInputChange('confirmPassword', e)} placeholder="Confirm password"
                           type="password"></ion-input>
              </ion-item>

            </ion-list>

            <ion-button onClick={() => this.register()} class="continue-button">Register</ion-button>

          </ion-col>
        </ion-row>

      </ion-content>

    ];
  }
}
