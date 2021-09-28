import * as path from 'path';
require('dotenv').config({
  path: path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`),
});
const { DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE, DB_HOST, DB_SYNC } =
  process.env;
import { ConnectionOptions } from 'typeorm';

const ormConfig: ConnectionOptions = {
  name: 'default',
  type: 'postgres',
  host: DB_HOST,
  port: parseInt(DB_PORT, 10),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  synchronize: DB_SYNC === 'true',
  entities: ['dist/**/*.entity.js'],
};

export default ormConfig;
