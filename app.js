const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3000

var morgan = require('morgan');
app.use(morgan('tiny'));
app.use(cors())

//middleware express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//import from home.js and dota2.js
const home = require('./routes/home')
const dota2 = require('./routes/dota2')
const user = require('./routes/user')
app.use('/',home);
app.use('/api/dota2',dota2);
app.use('/api/user',user);



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});