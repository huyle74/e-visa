import prisma from "../prisma/prisma";

const findAllCountry = async () => {
  try {
    const results = await prisma.country.findMany();
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

const countryRepo = { findAllCity, findAllCountry, findAllState };

export default countryRepo;
