const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const _ = require('lodash');

const port = 3001;

const app = express();
const address = `http://localhost:${port}`
let patients = [];
const patientList = fs.readdir('./scans', (err, items)=>{
    if (err){
      console.log(err);
      return err;
    }else{
      patients = items;
      return items;
    }
  })

app.use(bodyParser.json());
app.use(cors());
app.use(express.static('scans'));
app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });

app.get('/', (req, res)=>{
  res.status(200).json("Main Page");
})

app.get('/scan', (req, res)=>{
  res.json(patients);
})

app.get('/randomscan',cors(), (req, res)=>{
  const index = _.sample(patients);
  res.json({url:`${address}/${index}/slice_`,
            imgFormat:".png",
            amnt:32});
})

app.listen(port, ()=>{
  console.log("connected");
});
