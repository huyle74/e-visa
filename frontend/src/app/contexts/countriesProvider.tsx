"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";
import { backend_url } from "../server-side/envLoader";

const endpoint = backend_url + "api" + "/static/countries";

interface CountriesProviderProps {
  children: ReactNode;
}

interface Country {
  code: string;
  engName: string;
  iso2: string;
  countryCode: string;
  from: boolean;
  to: boolean;
}

interface Nation {
  countries: Country[];
  countriesName: string[];
  fromCountries: Country[];
  toCountries: Country[];
}

const CountriesContext = createContext<Nation | null>(null);

export const CountriesProvider = ({ children }: CountriesProviderProps) => {
  const [allCountries, setAllCountries] = useState<Country[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(endpoint);
        setAllCountries(response.data.data);
      } catch (error) {
        return [];
      }
    })();
  }, []);
  const countriesName = allCountries.map((country: Country) => {
    return country.engName;
  });
  const fromCountries = allCountries.filter((nation: Country) => {
    return nation.from === true;
  });
  const toCountries = allCountries.filter((nation: Country) => {
    return nation.to === true;
  });

  return (
    <CountriesContext.Provider
      value={{
        countries: allCountries,
        countriesName,
        fromCountries,
        toCountries,
      }}
    >
      {children}
    </CountriesContext.Provider>
  );
};

export function useCountries() {
  const ctx = useContext(CountriesContext);
  if (!ctx) throw new Error("useAuth must be used within <CountriesProvider>");
  return ctx;
}
