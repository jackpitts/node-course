const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const address = process.argv[2]

geocode(address, (error, { latitude, longitude, name } = {}) => {
    if (address === undefined) {
        return console.log("Perfavore, inserire un indirizzo!")
    }
    if (error) {
        return console.log(error)
    }

    forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
            return console.log(error)
        }
        console.log(name)
        console.log(forecastData)
    })
})

