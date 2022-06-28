const axios = require("axios");
const { Activity, Country } = require("../db");

const url = "https://restcountries.eu/rest/v2/all";

const getApiInfo = async () => {
  try {
    const response = await axios.get(url);
    const data = response.data;
    const countries = data.map((e) => {
      return {
        id: e.cca3,
        name: e.name.common,
        flags: e.flags[1],
        continents: e.region,
      };
    });
    return countries;
  } catch (e) {
    console.log(e);
  }
};

const getCountriesDetail = async (arg) => {
  try {
    const countries = await axios.get(
      `https://restcountries.eu/rest/v2/alpha/${arg}`
    );
    const data = await countries.data;
    const country = {
      id: data.cca3,
      name: data.name.common,
      flags: data.flags[1],
      continents: data.region,
      capital: data.capital ? data.capital : "Don't have a Capital",
      subregion: data.subregion,
      area: data.area,
      population: data.population,
    };

    return country;
  } catch (e) {
    console.log(e);
  }
};

const getDbInfo = async () => {
  try {
    return await Country.findAll({
      include: {
        model: Activity,
        attributes: ["id", "name", "dificulty", "duration", "season"],
        through: {
          attributes: [],
        },
      },
    });
  } catch (e) {
    console.log(e);
  }
};

const getAllCountries = async () => {
  try {
    const countries = await getCountriesDetail();
    const dbCountries = await getDbInfo();
    const allCountries = countries.concat(dbCountries);
    return allCountries;
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getApiInfo,
  getCountriesDetail,
  getDbInfo,
  getAllCountries,
};
