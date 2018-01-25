import * as express from 'express';
import * as bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';

import * as config from './config';

// App class will encapsulate our web server.
export class App {
  public express: express.Application;

  constructor () {}

  init(port: string | number) {
    this.express = express();
    // Allow parsing JSON data obtained from post
    this.express.use(bodyParser.json());
  
    this.initDatabase(() => {
      this.mountRoutes();
  
      this.express.listen(port);
      console.log(`Server is now listening on port ${port}...`);
    });
  }

  //mounts the routes served by the server.
  private mountRoutes (): void {
    this.express.use('/auth', require('./auth/routes'));
  }

  private initDatabase(callback: any): void {
    MongoClient.connect(config.DB_URI, (err, db) => {
      if (err) return console.error('Unable to connect to MongoDB server');
      console.log('Connected to MongoDB server');
      callback();
      db.close();
    });
  }
}

// The express instance is reachable through the public express property.
export default new App();