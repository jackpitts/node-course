// Object property shorthand

const name = "Andrew"
const userAge = 27

const user = {
    name, // Shorthand syntax, avaiable with variable and property having the same name
    age: userAge,
    location: "Philadelphia"
}

console.log(user)

// Object destructuring

const product = {
    label: "Red notebook",
    price: 3,
    stock: 201,
    salePrice: undefined
}

// const {label:productLabel /* change property name */ , stock, rating = 5} = product

// console.log(productLabel)
// console.log(stock)
// console.log(rating)

const transaction = (type, { label, stock = 0} = {} /* Default parameter value */) => {
    console.log(type, label, stock)
}

transaction("Order", product)