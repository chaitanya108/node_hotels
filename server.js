const express = require('express')
const app = express()
const db = require('./db')

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const person = require('./models/person')

const personRoutes = require('./routes/personRoutes')

app.get('/', function(req, res){
    res.send("Welcome honey")
});

app.use('/person', personRoutes);

//commen
app.listen(3000, ()=>{
    console.log('listening on port 3000')
});
