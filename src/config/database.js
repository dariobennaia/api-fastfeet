const {
  DB_DRIVER,
  DB_HOST,
  DB_USERNAME,
  DB_PASSWORD,
  DB_DATABASE,
  DB_PORT,
} = process.env;

module.exports = {
  dialect: DB_DRIVER,
  host: DB_HOST,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  port: DB_PORT,
  define: {
    timestamp: true,
    underscored: true,
    underscoredAll: true,
  },
};
