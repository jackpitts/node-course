const request = require("request")

const geocode = (address, callback) => {
    const url = 'http://api.positionstack.com/v1/forward?access_key=a50837cf34debff7592b0960aba61881&limit=1&query=' + encodeURIComponent(address) + ''
    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback("Unable to connect to weather services!", undefined)
        } else if (body.data.length === 0) {
            callback("Unable to find location.", undefined)
        } else {
            callback(undefined, {
                latitude: body.data[0].latitude,
                longitude: body.data[0].longitude,
                name: body.data[0].label
            })
        }
    })
}

module.exports = geocode