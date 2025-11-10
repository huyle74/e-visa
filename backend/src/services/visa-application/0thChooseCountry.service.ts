import countryRepo from "@/repositories/country.repository";
import priceRepo from "@/repositories/price.repository";

const chooseCountriesService = {
  async getFromToCountries() {
    const countries = await countryRepo.getFromToCountries();

    return countries;
  },

  async getPrice(fromCountry: string, toCountry: string) {
    const fromToCountries = await countryRepo.getOneFromToCountry(
      fromCountry,
      toCountry
    );
    const fee = await priceRepo.getServiceFee();
    const standardPrice = fee?.filter((price) => price.type === "standard") ?? [
      { fee: 59 },
    ];

    const governmentFee = Number(fromToCountries?.to?.governmentFee);

    const totalPrice = governmentFee + standardPrice[0].fee;

    return { totalPrice };
  },
};

export default chooseCountriesService;
