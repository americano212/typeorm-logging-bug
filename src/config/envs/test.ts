export const config = {
  db: {
    type: 'mysql',
    synchronize: true,
    logging: false,
    host: 'localhost',
    port: 33061,
    username: 'root',
    password: 'test1234!',
    database: 'test_database',
    keepConnectionAlive: true,
    connectTimeout: 15000,
    extra: { connectionLimit: 5 },
    autoLoadEntities: true,
  },
  jwt: {
    accessSecret: process.env['DEV_JWT_ACCESS_SECRET'] || 'testAsecret',
    refreshSecret: process.env['DEV_JWT_REFRESH_SECRET'] || 'testRsecret',
    accessTokenExpire: process.env['ACCESS_TOKEN_EXPIRE'] || '1d',
    refreshTokenExpire: process.env['REFRESH_TOKEN_EXPIRE'] || '30d',
  },
  api: {
    port: process.env['PORT'],
  },
};
