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
      image: joi.string().min(11).max(200),
    });
    const { error } = schema.validate(reqBody);

    if (error) {
      res.send(`error adding a card:${error}`);
    }

    const sql =
      "INSERT INTO bussines(customer_id,name,description,address,phone,image)" +
      "WHERE (bussines.customer_id=customers.id)" +
      " VALUES(?,?,?,?,?,?);";

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
      return;
    }

    res.send(`${reqBody.name} added successfully`);
  },

  findCard: async function (req, res) {
    const sql = "SELECT * FROM bussines WHERE bussines.id=?;";
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

  setCard: async function (req, res, next) {
    const reqBody = req.body;
    const schema = joi
      .object({
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
        image: joi.string().min(11).max(200),
      })
      .min(1);

    const { error, value } = schema.validate(reqBody);
    if (error) {
      res.status(400).send(`error update card: ${error}`);
      return;
    }

    const keys = Object.keys(value);
    const values = Object.values(value);

    const fields = keys.map((key) => `${key}=?`).join(",");
    values.push(req.params.id);

    const sql = "UPDATE bussines SET VALUES(?,?,?,?,?,?) WHERE id=?";

    try {
      const result = await database.query(sql, values);
      res.json(value);
    } catch (err) {
      console.log(err);
      return;
    }
  },

  deleteCard: async function (req, res) {
    const schema = joi.object({
      id: joi.number().required(),
    });

    const { error, value } = schema.validate(req.params);
    if (error) {
      res.status(400).send("error delete product");
      console.log(error.details[0].message);
      return;
    }
    const sql = "DELETE FROM bussines WHERE id=?";

    try {
      const result = await database.query(sql, [value.id]);
      res.json({
        id: value.id,
      });
    } catch (err) {
      res.status(400).send("error delete product");
      console.log(err.message);
    }
  },
};
