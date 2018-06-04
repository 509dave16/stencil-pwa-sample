import 'babel-polyfill';
import 'rxjs';
import pouchdbAdapterIdb from "pouchdb-adapter-idb";
import RxDB from 'rxdb';
RxDB.plugin(pouchdbAdapterIdb);

// import {SuperLoginService} from "../../components/superlogin-service-injector/superlogin.service";

export class RxDBServiceClass {
  public dbs: any;
  public dbNames: string[] = ['relational', 'authors', 'books'];

  constructor() {}

  public async init() {
    // if (!SuperLoginService.SuperLoginClient.authenticated) {
    //   throw Error('User is not logged int');
    // }
    // const createDbPromises = this.dbNames.map(async (dbName: string) => {
      // const remoteName = SuperLoginService.SuperLoginClient.getDbUrl(dbName);
    //   this.dbs[dbName]= await RxDB.create({
    //     name: dbName,
    //     password: 'myPassword',
    //     adapter: 'idb',
    //     multiInstance: false
    //   });
    // });
    // return Promise.all(createDbPromises);
      return Promise.resolve({});
  }
}

export const RxDBService = new RxDBServiceClass();

