const cors = require('cors')

const corsOption ={
    origin:['http://localhost:3000'],
    optionsSuccessStatus:200
}

module.exports = cors(corsOption)