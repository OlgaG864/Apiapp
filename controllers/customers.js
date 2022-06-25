const database = require("./databse");

module.exports = {
  findCustomer: async function (req, res) {
    const sql = "SELECT * FROM customers WHERE customers.id=?;";

    try {
      const result = await database.query(sql); //rows and fields
      res.send(result[0]);
    } catch (err) {
      console.log(err);
    }
  },

  cardsList: async function (req, res) {
    const sql =
      "SELECT bussines.name,bussines.description,bussines.address,bussines.phone,bussines.image" +
      " FROM bussines LEFT JOIN customers cust " +
      "ON bussines.customer_id = cust.id ORDER BY bussines.id ASC;";
  },
};
