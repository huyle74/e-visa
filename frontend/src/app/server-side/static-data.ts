"use server";

import axios from "axios";
import { backend_url } from "./envLoader";

const prefix = backend_url + "api";

export async function getCountriesData() {
  try {
    const endpoint = prefix + "/static/countries";
    const response = await axios.get(endpoint);
    if (response.data.success === "OK") {
      return response.data.data;
    } else return [];
  } catch (error) {
    console.log(error);
  }
}

const getStatesData = async (country: string) => {
  try {
    const endpoint = prefix + "/static/cities";
    const response = await axios.post(endpoint, { country });
    if (response.data.success === "OK") {
      return response.data.data;
    } else return [];
  } catch (error) {
    console.log(error);
  }
};

export async function getEligibilltyEnum() {
  try {
    const endpoint = prefix + "/static/eligibiltyData";
    const response = await axios.get(endpoint);
    if (response.data.success === "OK") {
      console.log(response.data.data);
      return response.data.data;
    } else return [];
  } catch (error) {
    console.log(error);
  }
}

export async function getApplicationInfoEnum() {
  try {
    const endpoint = prefix + "/static/applicationInfoData";
    const response = await axios.get(endpoint);
    if (response.data.success === "OK") {
      console.log(response.data.data);
      return response.data.data;
    } else return [];
  } catch (error) {
    console.log(error);
  }
}
