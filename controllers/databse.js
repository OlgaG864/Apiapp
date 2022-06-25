const mysql = require("mysql2");
const config = require("../config/dev");

const pool = mysql.createPool({
  host: config.DB_HOST,
  user: config.DB_USER,
  database: config.DB_NAME,
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
});

async function query(sql, values) {
  const promisePool = pool.promise();
  if (error) {
    console.log(error);
  }

  return ([rows, fields] = await promisePool.query(sql, values));
}

module.exports = {
  pool,
  query,
};
