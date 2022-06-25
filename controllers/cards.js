const database = require("./databse");
const joi = require("@hapi/joi");

module.exports = {
  addCard: async function (req, res, next) {
    const reqBody = req.body;
    const schema = joi.object({
      name: joi.string().required().min(2).max(200),
      address: joi.string().required().min(2).max(200),
      description: joi.string().required().max(300),
      phone: joi
        .string()
        .min(9)
        .max(10)
        .required()
        .regex(/^0[2-9]\d{7,8}$/),
      customer_id: joi.number().required(),
    });
    const { error } = schema.validate(reqBody);

    if (error) {
      res.send(`error adding a card:${error}`);
    }

    const sql =
      "INSERT INTO bussines(customer_id,name,description,address,phone)" +
      "WHERE (bussines.customer_id=customers.id)" +
      " VALUES(?,?,?,?,?);";

    try {
      const result = await database.query(sql, [
        reqBody.customer_id,
        reqBody.name,
        reqBody.description,
        reqBody.address,
        reqBody.phone,
      ]);
    } catch (error) {
      console.log(error);
      return;
    }

    res.send(`${reqBody.name} added successfully`);
  },

  findCard: async function (req, res) {
    const sql = "SELECT * FROM bussiness WHERE bussiness.id=?;";
    try {
      const result = await database.query(sql, [
        reqBody.customer_id,
        reqBody.name,
        reqBody.description,
        reqBody.address,
        reqBody.phone,
        reqBody.image,
      ]);
    } catch (error) {
      console.log(error);
    }
  },

  setCard: async function (req, res) {
    const sql = "UPDATE bussines SET VALUES(?,?,?,?,?,?) WHERE id=?";

    try {
      const result = await database.query(sql); //rows and fields
      res.send(result[0]);
    } catch (err) {
      console.log(err);
    }
  },

  deleteCard: async function (req, res) {
    const sql = "DELETE FROM bussines WHERE id=?";

    try {
      const result = await database.query(sql); //rows and fields
      res.send(result[0]);
    } catch (err) {
      console.log(err);
    }
  },
};
