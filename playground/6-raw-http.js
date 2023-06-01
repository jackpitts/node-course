const http = require("http")
const url = 'http://api.weatherstack.com/current?access_key=28729a141c4a0ef7ff0509d9cd55d819&query=40,-75&units=m'

const request = http.request(url, (response) => {
    let data = ""

    response.on("data", (chunk) => {
        data = data + chunk.toString()
    })
    
    response.on("end", () => {
        const body = JSON.parse(data)
        console.log(body)
    })
})

request.on("error", (error) => {
    console.log("An error", error)
})

request.end()