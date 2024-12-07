import { PrismaClient } from "@prisma/client";

// Learn more about instantiating PrismaClient in Next.js here: https://www.prisma.io/docs/data-platform/accelerate/getting-started

const prismaClientSingleton = () => {
  return new PrismaClient().$extends({
    result: {
      customer: {
        rates: {
          // Specify that `rates` depends on `customRates`
          needs: { customRates: true },
          compute(customer) {
            // Fetch default rates if the customer has no custom rates
            return async () => {
              if (customer.customRates && customer.customRates.length > 0) {
                return customer.customRates; // Return custom rates
              }

              // Fetch default rates (rates with no customerId)
              const defaultRates = await prisma.rate.findMany({
                where: {
                  customerId: null,
                },
              });
              return defaultRates;
            };
          },
        },
      },
    },
  });
};

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
