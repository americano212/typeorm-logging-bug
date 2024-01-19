export const config = {
  db: {
    type: process.env['DB_TYPE'] || 'mysql',
    synchronize: true,
    logging: false,
    host: process.env['TEST_DB_HOST'] || 'testHost',
    port: process.env['TEST_DB_PORT'] || 3306,
    username: process.env['TEST_DB_USER'] || 'username',
    password: process.env['TEST_DB_PASSWORD'] || 'password',
    database: process.env['TEST_DB_NAME'] || 'dbname',
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
  aws: {
    accessKey: process.env['AWS_ACCESS_KEY_ID'] || '',
    secretKey: process.env['AWS_SECRET_ACCESS_KEY'] || '',
    region: process.env['AWS_REGION'],
    s3: {
      bucketName: process.env['AWS_S3_BUCKET_NAME'] || '',
    },
    sms: {
      account: process.env['MAIL_AWS_ACCOUNT'],
      password: process.env['MAIL_AWS_PASSWORD'],
      serever: process.env['MAIL_SERVER'],
    },
  },
  slack: {
    webhookUrl: process.env['SLACK_WEBHOOK_URL'] || '',
  },
  oauth: {
    kakao: {
      clientID: process.env['KAKAO_CLIENT_ID'],
      clientSecret: process.env['KAKAO_CLIENT_SECRET'],
      callbackURL: process.env['KAKAO_CALLBACK_URL'],
    },
  },
  bcrypt: {
    salt: Number(process.env['BCRYPT_SALT']) || 10,
  },
};
