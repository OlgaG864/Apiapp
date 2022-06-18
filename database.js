const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  DB_USER: "root",
  DB_NAME: "myclients",
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
});

async function query(sql, values) {
  const promisePool = pool.promise();
  return ([rows, fields] = await promisePool.query(sql, values));
}

module.exports = {
  query,
};
