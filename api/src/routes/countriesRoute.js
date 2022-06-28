const express = require('express');
const {getApiInfo, getCountriesDetail, getDbInfo, getAllCountries} = require('./functions');
const {Activity, Country} = require('../db');

const router = express.Router();

router.get("/", async (req, res) => {
    try {
     let {name} = req.query;
     let countriesTotal = await getAllCountries();
    } catch (e) {
        console.log(e);
    }
})