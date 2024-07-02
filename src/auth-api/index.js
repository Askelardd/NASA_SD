const express = require("express");
const cors = require("cors");
const knexConfig = require("./knexfile").db;
const knex = require("knex")(knexConfig);

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Auth Api");
});

app.get("/teachers", async (req, res) => {
  try {
    const teachers = await knex.select("*").from("teachers");
    res.json(teachers);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving data");
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await knex.select("*").from("users");
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving data");
  }
});

app.post('/adduser', async (req, res) => {
  try {
      const { username, password, permission } = req.body;
      await knex('users').insert({
          username,
          password,
          permission
      });
      res.sendStatus(200);
  } catch (error) {
      console.error(error);
      res.status(500).send('Error inserting data: ' + JSON.stringify(error));
  }
});

app.put('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password, permission } = req.body;

    await knex('users')
      .where({ id })
      .update({
        username,
        password,
        permission
      });

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating data: ' + JSON.stringify(error));
  }
});

app.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await knex('users')
      .where({ id })
      .del();

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting data: ' + JSON.stringify(error));
  }
});

const PORT = process.env.PORT || 18080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
