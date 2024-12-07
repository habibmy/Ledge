const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createDefaultRates = async () => {
  try {
    const defaultRates = [
      { size: 5, rate: 95.0 },
      { size: 6, rate: 92.0 },
    ];

    for (const rate of defaultRates) {
      await prisma.rate.create({
        data: {
          size: rate.size,
          rate: rate.rate,
          customerId: null, // Indicates default rate
        },
      });
    }
    console.log("Default rates added successfully!");
  } catch (error) {
    console.error("Error adding default rates:", error);
  }
};

createDefaultRates();
