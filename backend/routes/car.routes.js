const express = require("express");
const { createCar, deleteCar, getCars, updateCar } = require("../controller/car.controller.js");


const router = express.Router()

router.get("/", getCars)

router.post("/", createCar)

router.put("/:id" , updateCar)

router.delete("/:id", deleteCar)


module.exports = router