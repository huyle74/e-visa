import countryRepo from "@/repositories/country.repository";

export const staticService = {
  async getAllCountries() {
    const countries = await countryRepo.findAllCountry();
    if (!countries) throw new Error("Get countries data from database got error");

    return countries;
  },

  async getCitiesByState(state: string) {
    const cities = await countryRepo.findAllCity(state);
    if (!cities) throw new Error("Cannot find citis with this state");

    return cities;
  },

  async getStatesByCountry(country: string) {
    const states = await countryRepo.findAllState(country);
    if (!states) throw new Error("Cannot find citis with this state");

    return states;
  },
};
