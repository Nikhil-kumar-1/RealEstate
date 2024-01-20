const asyncHandler = require("express-async-handler");
const prisma = require("../config/prismaConfig").prisma;

const createUser = asyncHandler(async (req, res) => {
  console.log("Creating user");
  let { email } = req.body;
  const userExists = await prisma.user.findUnique({ where: { email: email } });

  if (!userExists) {
    const user = await prisma.user.create({ data: req.body });
    res.send({
      message: "User registered successfully",
      user: user,
    });
  } else {
    res.status(201).send({ message: "User already registered" });
  }
});

module.exports = { createUser };
