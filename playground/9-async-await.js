const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (a < 0 || b < 0) {
                return reject('Numbers must be positive!')
            }
            resolve(a + b)
        }, 2000)
    })
}

// Not faster! Just easier to read
const doWork = async () => {
    const sum = await add(1, 99) // add into a variable without callback functions
    const sum2 = await add(sum, 50)
    const sum3 = await add(sum2, -3)
    return sum3
}

doWork().then((result) => {
    console.log('Result:', result)
}).catch((error) => {
    console.log('Error:', error)
})
