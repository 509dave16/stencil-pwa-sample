import {Component, Prop} from "@stencil/core";
import {AlertController} from "@ionic/core/dist/types/components/alert-controller/alert-controller";
import {LoadingController} from "@ionic/core/dist/types/components/loading-controller/loading-controller";
import {CommonComponent} from "../../common/classes/CommonComponent";

@Component({
  tag: 'rxdb-showcase',
  styleUrl: 'rxdb-showcase.sass'
})
export class RxDBShowcase extends CommonComponent {
  @Prop() authors: any[] = [];
  @Prop() books: any[] = [];
  @Prop() bookTitle: string;
  @Prop() authorId: string;
  @Prop() detachAuthorId: string;
  @Prop() detachBookId: string;
  @Prop() newAuthorId: string;
  @Prop({connect: 'ion-alert-controller'}) alertCtrl: AlertController;
  @Prop({connect: 'ion-loading-controller'}) loadCtrl: LoadingController;

  addBookToAuthor = async () => {
    let errorMessage = '';
    if (!this.authorId) {
      errorMessage += 'Must enter a number for Author Id.';
    }
    if (!this.bookTitle) {
      errorMessage += errorMessage ? ' And must' : 'Must';
      errorMessage += ' enter a title for the book.';
    }
    if (errorMessage) {
      let alert = await this.alertCtrl.create({
        header: 'Validation Errors',
        subHeader: errorMessage,
        buttons: ['Dismiss']
      });
      alert.present();
      return;
    }
    const loading = await this.loadCtrl.create({content: 'Creating Book for Author'});
    loading.present();
    // const author: DocModel = await this.relationalService.addBookToAuthor({ title: this.bookTitle}, parseInt(this.authorId));
    // this.initializeData(author);
    this.bookTitle = '';
    this.authorId = '';
    loading.dismiss();
  };

  removeAllData = async () => {
    const loading = await this.loadCtrl.create({content: 'Removing all docs'});
    loading.present();
    // await this.relationalService.removeAllData();
    loading.dismiss();
  };

  removeBookFromAuthor = async () => {
    let errorMessage = '';
    if (!this.detachAuthorId) {
      errorMessage += 'Must enter a number for Author Id.';
    }
    if (!this.detachBookId) {
      errorMessage += errorMessage ? ' And must' : 'Must';
      errorMessage += 'Must enter a number for the Book Id.';
    }
    if (errorMessage) {
      let alert = await this.alertCtrl.create({
        header: 'Validation Errors',
        subHeader: errorMessage,
        buttons: ['Dismiss']
      });
      alert.present();
      return;
    }
    const loading = await this.loadCtrl.create({content: 'Removing Book from Author'});
    loading.present();
    // const author: DocModel = await this.relationalService.removeBookFromAuthor(parseInt(this.detachBookId), parseInt(this.detachAuthorId));
    // this.initializeData(author);
    this.detachBookId = '';
    this.detachAuthorId = '';
    loading.dismiss();
  };

   addAuthor = async() => {
    let errorMessage = '';
    if (!this.newAuthorId) {
      errorMessage += 'Must enter a number for Author Id.';
    }
    if (errorMessage) {
      let alert = await this.alertCtrl.create({
        header: 'Validation Errors',
        subHeader: errorMessage,
        buttons: ['Dismiss']
      });
      alert.present();
      return;
    }
    const loading = await this.loadCtrl.create({content: 'Adding Author'});
    loading.present();
    // const author: DocModel = await this.relationalService.createAuthor(this.newAuthorId);
    this.newAuthorId = '';
    loading.dismiss();
  };

  render() {
    return [
      <ion-header>
        <ion-toolbar color='primary'>
          <ion-title>Ionic PWA Toolkit</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content padding>
        {this.renderAuthorSection()}
        {this.renderBookSection()}
        <ion-item-group>
          <ion-item-divider color="light">Add Book To Author</ion-item-divider>
          <form onSubmit={(e) => this.handleFormSubmit(e, this.addBookToAuthor)}>
            <ion-item>
              <ion-label>Author Id</ion-label>
              <ion-input type="number" onInput={(e) => this.handleInputChange('authorId', e)}
                         name="authorId"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label>Book Title</ion-label>
              <ion-textarea onInput={(e) => this.handleInputChange('bookTitle', e)} name="title"></ion-textarea>
            </ion-item>
            <ion-button type="submit" expand={"block"}>Submit</ion-button>
          </form>
        </ion-item-group>
        <ion-item-group>
          <ion-item-divider color="light">Remove Book From Author</ion-item-divider>
          <form onSubmit={(e) => this.handleFormSubmit(e, this.removeBookFromAuthor)}>
            <ion-item>
              <ion-label>Author Id</ion-label>
              <ion-input type="number" onInput={(e) => this.handleInputChange('detachAuthorId', e)}
                         name="detachAuthorId"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label>Book Id</ion-label>
              <ion-input onInput={(e) => this.handleInputChange('detachBookId', e)} name="detachBookId"></ion-input>
            </ion-item>
            <ion-button type="submit" expand={"block"}>Submit</ion-button>
          </form>
        </ion-item-group>
        <ion-item-group>
          <ion-item-divider color="light">Remove All Data</ion-item-divider>
          <form onSubmit={(e) => this.handleFormSubmit(e, this.removeAllData)}>
            <ion-button type="submit" expand={"block"}>Submit</ion-button>
          </form>
        </ion-item-group>
      </ion-content>
    ]
  }

  renderAuthorSection() {
    return this.renderListSection('Authors', this.renderAuthors());
  }

  renderAuthors() {
    if (this.authors.length === 0) {
      return ([<div>No authors have been added</div>])
    }
    return this.authors.map(author => (
      <ion-item>
        <div>Id: {author.getField('id')}</div>
        <div>Name: {author.getField('name')}</div>
      </ion-item>
    ));
  }

  renderBookSection() {
    return this.renderListSection('Books', this.renderBooks());
  }

  renderBooks() {
    if (this.books.length === 0) {
      return ([<div>No books have been added</div>]);
    }
    return this.books.map(book => (
      <ion-item>
        <div>Id: {book.getField('id')}</div>
        <div>Title: {book.getField('title')}</div>
      </ion-item>
    ));
  }

  renderListSection(heading: string, list: any[]) {
    return ([
      <ion-item-divider color="light">{heading}</ion-item-divider>,
      <div style={{'overflow-y': 'auto', 'height': '200px'}}>
        <ion-list>
          <ion-item-group>
            {list}
          </ion-item-group>
        </ion-list>
      </div>
    ]);
  }
}
