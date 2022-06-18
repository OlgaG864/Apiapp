const database = require("../database");
const joi = require("@hapi/joi");
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");

module.exports = {
  addCustomer: async function (req, res, next) {
    const reqBody = req.body;
    const schema = joi.object({
      first_name: joi.string().required().min(2).max(200),
      last_name: joi.string().required().min(2).max(200),
      email: joi.string().required(),
      password: joi.string().required().min(6),
      operative: joi.boolean().required(),
    });
    const { error } = schema.validate(reqBody);

    if (error) {
      res.send(`error adding a customer:${error}`);
    }
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);

    const sql =
      "INSERT INTO customers(first_name, last_name, email, password,operative)" +
      " VALUES(?,?,?,?,?);";

    try {
      const result = await database.query(sql, [
        reqBody.first_name,
        reqBody.last_name,
        reqBody.email,
        reqBody.password,
      ]);
    } catch (error) {
      console.log(error);
      return;
    }

    res.send(`${reqBody.first_name} added successfully`);
  },

  findCustomer: async function (req, res) {
    const sql = "SELECT FROM customers customers.id WHERE email=?;";

    try {
      const result = await database.query(sql); //rows and fields
      res.send(result[0]);
    } catch (err) {
      console.log(err);
    }
  },
};
