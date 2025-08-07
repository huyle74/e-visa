import { PrismaClient } from '@prisma/client';
import { countries } from '../utils/countries';
import { Nation } from '../dto/auth.dto';

const prisma = new PrismaClient();

async function addCountries(countries: any) {
  countries.map(async (country: Nation) => {
    const { countryCode, code, engName, iso2 } = country;
    await prisma.country.upsert({
      where: { iso2 },
      update: {},
      create: {
        iso2,
        countryCode,
        code,
        engName,
      },
    });
  });

  console.log('✅ Seeding done.');
}

addCountries(countries)
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
