const asyncHandler = require("express-async-handler");
const prisma = require("../config/prismaConfig").prisma;

const createResidency = asyncHandler(async (req, res, next) => {
  const {
    title,
    description,
    price,
    address,
    country,
    city,
    facilities,
    image,
    userEmail,
  } = req.body.data;

  console.log(req.body.data);

  try {
    const residency = await prisma.residency.create({
      data: {
        title,
        description,
        price,
        address,
        country,
        city,
        facilities,
        image,
        owner: { connect: { email: userEmail } },
      },
    });

    res.send({ message: "Residency created successfully", residency });
    res.end(); // End the response to prevent additional headers
  } catch (error) {
    // Check if the error is a PrismaClientKnownRequestError indicating a duplicate entry
    if (error.code === "P2002" && error.meta?.target?.includes("address")) {
      return next(
        new Error("A residency with the given address already exists.")
      );
    }

    // Pass other errors to the Express error-handling middleware
    next(error);
  }
});

const getAllResidencies = asyncHandler(async (req, res) => {
  try {
    const residencies = await prisma.residency.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    res.send(residencies);
    res.end(); // End the response to prevent additional headers
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: "Internal Server Error" });
    res.end(); // End the response to prevent additional headers
  }
});

//functio to get a specific document/residency
const getResidency = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const residency = await prisma.residency.findUnique({
      where: { id: id },
    });
    res.send(residency);
  } catch (err) {
    throw new Error(err.message);
  }
});

module.exports = { createResidency, getAllResidencies, getResidency };
