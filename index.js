// console.log("\n === index.js executed!!! ===\n");

const express = require("express");
const shortid = require("shortid");

const server = express();

const port = 5000;

let users = [
  {
    id: shortid.generate(),
    name: "Jane Doe",
    bio: "Not Tarzan's Wife, another Jane.",
  },
  {
    id: shortid.generate(),
    name: "John Doe",
    bio: "Just another random dude!",
  },
];

//middleware
server.use(express.json());

//endpoints
server.get("/", (req, res) => {
  res.json({ message: "The API is running on http://localhost:5000" });
});

server.get("/api/users", (req, res) => {
  if (users) {
    res.status(200).json(users);
  } else {
    res
      .status(500)
      .json({ errorMessage: "The users information could not be retrieved." });
  }
});

server.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);

  const user = users.find((user) => user.id === id);

  if (user) {
    res.status(200).json(user);
  } else {
    res
      .status(404)
      .json({ message: "The user with the specified ID does not exist." });
  }
  res
    .status(500)
    .json({ errorMessage: "The user information could not be retrieved." });
});

server.post("/api/users", (req, res) => {
  const newUser = req.body;

  if (req.body.name && req.body.bio) {
    users.push(newUser);
    res.status(201).json(newUser);
  } else {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  }
});

server.delete("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);

  // const deletedUser = users.filter(user => user.id === id);

  if (req.body.id !== id) {
    res
      .status(404)
      .json({ message: "The user with the specified ID does not exist." });
  } else {
    res.status(500).json({ message: "The user could not be removed." });
  }
});

server.put("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);

  const updateUser = users.find((user) => user.id === id);

  if (updateUser) {
    res.status(200).json({ updateUser });
  } else {
    res
      .status(404)
      .json({ message: "The user with the specified ID does not exist." });
  }
});

server.listen(port, () => {
  console.log(`\n=== api on port ${port} ===\n`);
});
