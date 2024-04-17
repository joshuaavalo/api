const express = require('express');
const temperaments = express.Router();
const { Temperaments /* , Dog */ } = require('../db');
require('dotenv').config();
const axios = require('axios')
const { API_KEY } = process.env;
const URL = `https://api.thedogapi.com/v1/breeds?${API_KEY}`;
const { getDogs /* , getApiInfoDog, getDBInfoDog */ } = require('../controllers/dogControllers');

temperaments.use(express.json());


temperaments.get('/dog',/* http://localhost:3001/dog/?temperament=active */ async (req, res) => {
    const temperament = req.query.temperament;
    const everyDog = await getDogs();
    const dogSearchResult = everyDog.filter((dog) => {
        if (temperament === 'all') return everyDog
        else if (dog.temperament) {
            return (dog.temperament.toLowerCase()).includes(temperament.toLowerCase())
        }
    });
    res.status(200).json(dogSearchResult)
});

temperaments.post('/temperament/:temperament', async (req, res) => {
    try{
    const newTemperaments = req.params.temperament;
    const postedTemp = await Temperaments.create({
       name: newTemperaments,
    });
    return res.status(200).json(postedTemp)
    } catch (error) {
        res.status(404).send(error)
    }
});

module.exports = temperaments;