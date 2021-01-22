/////-------PostgreSQL-------------
// const parse = require('pg-connection-string').parse;
// const config = parse(process.env.PG_DATABASE_URL);

// module.exports = ({ env }) => ({
//   defaultConnection: 'default',
//   connections: {
//     default: {
//       connector: 'bookshelf',
//       settings: {
//         client: 'postgres',
//         host: config.host,
//         port: config.port,
//         database: config.database,
//         username: config.user,
//         password: config.password,
//         ssl: {
//           rejectUnauthorized: false
//         }
//       },
//       options: {
//         ssl: true,
//       },
//     },
//   },
// });


/////-------SQLite-------------
// module.exports = ({ env }) => ({
//   defaultConnection: 'default',
//   connections: {
//     default: {
//       connector: 'bookshelf',
//       settings: {
//         client: 'sqlite',
//         filename: `${process.env.SQLITE_DATABASE_FILENAME}`,
//       },
//       options: {
//         useNullAsDefault: true,
//       },
//     },
//   },
// });

/////-------MongoDB Atlass-----------
module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'mongoose',
      settings: {
        host: env('MG_DATABASE_HOST'),
        srv: env.bool('MG_DATABASE_SRV'),
        port: env.int('MG_DATABASE_PORT'),
        database: env('MG_DATABASE_NAME'),
        username: env('MG_DATABASE_USERNAME'),
        password: env('MG_DATABASE_PASSWORD'),
      },
      options: {
        authenticationDatabase: env('MG_AUTHENTICATION_DATABASE', null),
        ssl: env.bool('MG_DATABASE_SSL'),
      },
    },
  },
});
