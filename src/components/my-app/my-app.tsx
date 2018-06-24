import { Component, Prop, Listen } from '@stencil/core';

@Component({
  tag: 'my-app',
  styleUrl: 'my-app.css'
})
export class MyApp {

  @Prop({ connect: 'ion-toast-controller' }) toastCtrl: HTMLIonToastControllerElement;
  /**
   * Handle service worker updates correctly.
   * This code will show a toast letting the
   * user of the PWA know that there is a
   * new version available. When they click the
   * reload button it then reloads the page
   * so that the new service worker can take over
   * and serve the fresh content
   */
  @Listen('window:swUpdate')
  async onSWUpdate() {
    const toast = await this.toastCtrl.create({
      message: 'New version available',
      showCloseButton: true,
      closeButtonText: 'Reload'
    });
    await toast.present();
    await toast.onWillDismiss();
    window.location.reload();
  }


  componentDidLoad = async () => {
    this.presentModal();
  };

  presentModal = async() => {
    // initialize controller
    const modalController = document.querySelector('ion-modal-controller');
    await modalController.componentOnReady();

    // create component to open
    const element = document.createElement('div');
    element.innerHTML = `
  <ion-header>
    <ion-toolbar>
      <ion-title>Notice</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content>
    <h1>Please Login</h1>
    <ion-button href="/user-login" class="dismiss">Login</ion-button>
  </ion-content>
  `;

    // listen for close event
    const button = element.querySelector('ion-button');
    button.addEventListener('click', () => {
      modalController.dismiss();
    });

    // present the modal
    const modalElement = await modalController.create({
      component: element
    });
    modalElement.present();
  };


  render() {
    return (
      <ion-app>
        <ion-modal-controller></ion-modal-controller>
        <ion-router useHash={false}>
          <ion-route url='/' component='app-home'></ion-route>
          <ion-route url='/profile/:name' component='app-profile'></ion-route>
          <ion-route url="/rxdb-showcase" component="rxdb-showcase"></ion-route>
          <ion-route url='/login' component='user-login'></ion-route>
          <ion-route url='/registration' component='user-signup'></ion-route>
        </ion-router>
        <ion-nav></ion-nav>
      </ion-app>
    );
  }
}

