import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { countries } from "../utils/countries";
import { Nation } from "../dto/auth.dto";

const prisma = new PrismaClient();
const API_BASE =
  "https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/json/";

async function fetchData(endpoint: string) {
  const response = await fetch(`${API_BASE}${endpoint}.json`);
  return response.json();
}

async function addCountries() {
  const countries = await fetchData("countries");

  // await prisma.country.createMany({
  //   data: countries.map((row: any) => {
  //     return {
  //       engName: row.name,
  //       id: row.id,
  //       iso2: row.iso2,
  //       city: row.name,
  //       countryCode: "+" + row.phonecode,
  //       // code: row.
  //     };
  //   }),
  //   skipDuplicates: true,
  // });

  console.log(countries[100]);
  console.log("✅ Seeding add Countries done.");
}

async function addCities() {
  const cities = await fetchData("cities");
  await prisma.city.createMany({
    data: cities.map((row: any) => {
      return {
        country: row.country_name,
        id: row.id,
        state: row.state_name,
        city: row.name,
        nationIso2: row.country_code,
      };
    }),
    skipDuplicates: true,
  });

  console.log(cities[0]);
  console.log("----Done! added Cities----");
}

async function addStates() {
  const states = await fetchData("states");
  await prisma.state.createMany({
    data: states.map((row: any) => {
      return {
        id: row.id,
        country: row.country_name,
        state: row.name,
        nationIso2: row.country_code,
      };
    }),
    skipDuplicates: true,
  });
  console.log(states[0]);
  console.log("----Done!----");
}

addStates()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

addCities()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

addCountries()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
