import path from 'path';
import { MikroORM } from '@mikro-orm/core';

import { __prod__ } from './constants';
import { Post } from './entities/Post';

export default {
  entities: [Post],
  migrations: {
    path: path.join(__dirname, 'migrations'),
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
  type: 'postgresql',
  dbName: 'lireddit',
  user: 'postgres',
  password: 'postgres',
  debug: !__prod__,
} as Parameters<typeof MikroORM.init>[0];
