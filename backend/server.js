import express from "express";
const fs = require('fs').promises;
const bodyParser = require("body-parser");
import {PythonShell} from 'python-shell';

const app = express();
const port = 4200;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/buildChart/region/stackedBar", (req, res) => {
  const {region1, region2} = req.body;
  if(region1 && region2){
    const maxValue = region1.tamponi >= region2.tamponi ? region1.tamponi : region2.tamponi;
    let options = {
      mode: 'text',
      pythonPath: 'usr/bin/python',
      pythonOptions: ['-u'], // get print results in real-time
      scriptPath: 'charts',
      args: [
        region1.data,
        region1.denominazione_regione,
        region1.ricoverati_con_sintomi,
        region1.terapia_intensiva,
        region1.totale_ospedalizzati,
        region1.isolamento_domiciliare,
        region1.totale_attualmente_positivi,
        region1.nuovi_attualmente_positivi,
        region1.dimessi_guariti,
        region1.deceduti,
        region1.totale_casi,
        region1.tamponi,
        region2.data,
        region2.denominazione_regione,
        region2.ricoverati_con_sintomi,
        region2.terapia_intensiva,
        region2.totale_ospedalizzati,
        region2.isolamento_domiciliare,
        region2.totale_attualmente_positivi,
        region2.nuovi_attualmente_positivi,
        region2.dimessi_guariti,
        region2.deceduti,
        region2.totale_casi,
        region2.tamponi,
        maxValue
      ]
    };

    PythonShell.run('stackedBar.py', options, function (err, results) {
      if (err){ console.log(err); throw err;};
      console.log('results: %j', results);
    });

    pyshell.on('message', function (message) {
      console.log("Python on: " + message);
    });
    
    pyshell.end(function (err,code,signal) {
      if (err){ console.log(err); throw err;};
      res.send({ok: "Python Script Executed Correctly"});
      setTimeout(() => {
        (async () => {
          try {
            await fs.unlink('./charts/generatedImages/stackedBar.png');
          } catch (e) {
            console.log(e);
          }
        })();
      }, 1000);
      console.log('The exit code was: ' + code);
      console.log('The exit signal was: ' + signal);
    });
  } else res.send("Something went wrong with the data in stackedBar Post Data");
});

app.post("/buildChart/region/radar", (req, res) => {
  const {region1, region2} = req.body;
  if(region1 && region2){
    const maxValue = region1.tamponi >= region2.tamponi ? region1.tamponi : region2.tamponi;
    const python = spawn("python", ["./charts/radar.py",
      region1.data,
      region1.denominazione_regione,
      region1.ricoverati_con_sintomi,
      region1.terapia_intensiva,
      region1.totale_ospedalizzati,
      region1.isolamento_domiciliare,
      region1.totale_attualmente_positivi,
      region1.nuovi_attualmente_positivi,
      region1.dimessi_guariti,
      region1.deceduti,
      region1.totale_casi,
      region1.tamponi,
      region2.data,
      region2.denominazione_regione,
      region2.ricoverati_con_sintomi,
      region2.terapia_intensiva,
      region2.totale_ospedalizzati,
      region2.isolamento_domiciliare,
      region2.totale_attualmente_positivi,
      region2.nuovi_attualmente_positivi,
      region2.dimessi_guariti,
      region2.deceduti,
      region2.totale_casi,
      region2.tamponi,
      maxValue
    ]);
    
    python.stdout.on("data", data => {
      console.log(`express stdout\n: ${data}`);
    });

    python.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`);
    });

    python.on("close", code => {
      res.send({ok: "Python Script Executed Correctly"});
      setTimeout(() => {
        (async () => {
          try {
            await fs.unlink('./charts/generatedImages/stackedBar.png');
          } catch (e) {
            console.log(e);
          }
        })();
      }, 1000);
      console.log(`child process close all stdio with code ${code}`);
    });
  } else res.send("Something went wrong with the data in radar Post Data");
});

app.listen(port, () =>
  console.log(`SickBot Backend is listening on port ${port}!`)
);
