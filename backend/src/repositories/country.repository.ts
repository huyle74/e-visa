import prisma from "../prisma/prisma";

const findAllCountry = async () => {
  try {
    const results = await prisma.country.findMany({
      where: { id: { not: 251 } },
      select: {
        engName: true,
        from: true,
        to: true,
        iso2: true,
        code: true,
        id: true,
      },
    });

    return results;
  } catch (error) {
    console.error(error);
  }
};

const findAllCity = async (state: string) => {
  try {
    const results = await prisma.city.findMany({ where: { state: state } });
    return results;
  } catch (error) {
    console.error(error);
  }
};

const findAllState = async (country: string) => {
  try {
    const states = await prisma.state.findMany({ where: { country: country } });
    return states;
  } catch (error) {
    console.error(error);
  }
};

const getFromToCountries = async () => {
  try {
    const from = await prisma.country.findMany({
      where: { from: true },
    });
    const to = await prisma.country.findMany({
      where: { to: true },
    });

    return { from, to };
  } catch (error) {
    console.error(error);
  }
};

const getOneFromToCountry = async (from: string, to: string) => {
  try {
    const [fromData, toData] = await Promise.all([
      prisma.country.findFirst({ where: { engName: from } }),
      prisma.country.findFirst({ where: { engName: to } }),
    ]);

    return { from: fromData, to: toData };
  } catch (error) {
    console.error(error);
  }
};

const countryRepo = {
  findAllCity,
  findAllCountry,
  findAllState,
  getFromToCountries,
  getOneFromToCountry,
};

export default countryRepo;
