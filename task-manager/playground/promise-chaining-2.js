require('../src/db/mongoose')
const Task = require ('../src/models/task')

// // Delete task and get numbers of incompleted document 
// Task.findByIdAndDelete('646cdb801d7621839cefae19').then(() => {
//     return Task.countDocuments({ completed: false })
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

const deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({ completed: false })
    return count
}

deleteTaskAndCount('646ce04d1d7621839cefae1c').then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
}) 