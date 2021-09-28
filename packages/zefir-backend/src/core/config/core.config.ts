import { registerAs } from '@nestjs/config';
import * as path from 'path';
require('dotenv').config({
  path: path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`),
});

export default registerAs('core', () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  usersUri: process.env.USERS_MICROSVC_URI,
}));
