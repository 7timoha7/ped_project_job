import path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

const rootPath = __dirname;

const config = {
  rootPath,
  publicPath: path.join(rootPath, 'public'),
  db: 'mongodb://localhost/job',
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
  },
  mail: 'esdpjs17@gmail.com',
  site: 'http://localhost:3000',
};

export default config;
