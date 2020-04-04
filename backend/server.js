import express from "express";
const fs = require("fs").promises;
const bodyParser = require("body-parser");
const { spawn } = require("child_process");

const app = express();
const port = 4200;
const deleteImagesTime = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/buildChart/region/stackedBar", (req, res) => {
  const { region1, region2 } = req.body;
  if (region1 && region2) {
    try {
      const maxValue =
        region1.tamponi >= region2.tamponi ? region1.tamponi : region2.tamponi;
      const python = spawn("python", [
        "./charts/r_stackedBar.py",
        region1.data,
        region1.denominazione_regione,
        region1.ricoverati_con_sintomi,
        region1.terapia_intensiva,
        region1.totale_ospedalizzati,
        region1.isolamento_domiciliare,
        region1.totale_positivi,
        region1.variazione_totale_positivi,
        region1.nuovi_positivi,
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
        region2.totale_positivi,
        region2.variazione_totale_positivi,
        region2.nuovi_positivi,
        region2.dimessi_guariti,
        region2.deceduti,
        region2.totale_casi,
        region2.tamponi,
        maxValue,
      ]);
      
      let imagePath = [];
      python.stdout.on("data", data => {
        console.log(data.toString());
      });
      python.stderr.on("data", data => {return imagePath.push(data.toString())});

      python.on("close", code => {
        res.send({imagePath});
        setTimeout(() => {
          (async () => {
            try {
              await fs.unlink(imagePath[0]);
            } catch (e) {
              console.log("error",e);
            }
          })();
        }, deleteImagesTime);
        console.log(`child process close all stdio with code ${code}`);
      });
    } catch (error) {
      console.log(error);
      return error;
    }
  } else res.send("Something went wrong with the data in stackedBar Post Data");
});


app.post("/buildChart/region/radar", (req, res) => {
  const { region1, region2 } = req.body;
  if (region1 && region2) {
    try {
      const maxValue =
        region1.tamponi >= region2.tamponi ? region1.tamponi : region2.tamponi;
      const python = spawn("python", [
        "./charts/r_radar.py",
        region1.data,
        region1.denominazione_regione,
        region1.ricoverati_con_sintomi,
        region1.terapia_intensiva,
        region1.totale_ospedalizzati,
        region1.isolamento_domiciliare,
        region1.totale_positivi,
        region1.variazione_totale_positivi,
        region1.nuovi_positivi,
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
        region2.totale_positivi,
        region2.variazione_totale_positivi,
        region2.nuovi_positivi,
        region2.dimessi_guariti,
        region2.deceduti,
        region2.totale_casi,
        region2.tamponi,
        maxValue
      ]);
      
      let imagePath = [];
      python.stdout.on("data", data => {
        console.log(data);
      });
      python.stderr.on("data", data => {return imagePath.push(data.toString())});

      python.on("close", code => {
        res.send({imagePath});
        setTimeout(() => {
          (async () => {
            try {
              await fs.unlink(imagePath[0]);
            } catch (e) {
              console.log("error",e);
            }
          })();
        }, deleteImagesTime);
        console.log(`child process close all stdio with code ${code}`);
      });
    } catch (error) {
      console.log(error);
      return error;
    }
  } else res.send("Something went wrong with the data in radar Post Data");
});

app.post("/buildChart/province/stackedBar", (req, res) => {
  const { province1, province2 } = req.body;
  if (province1 && province2) {
    try {
      const maxValue =
      province1.totale_casi >= province2.totale_casi ? province1.totale_casi : province2.totale_casi;
      const python = spawn("python", [
        "./charts/p_stackedBar.py",
        province1.data,
        province1.denominazione_provincia,
        province1.totale_casi,
        province2.data,
        province2.denominazione_provincia,
        province2.totale_casi,
        maxValue
      ]);
      
      let imagePath = [];
      python.stdout.on("data", data => {
        console.log(data);
      });
      python.stderr.on("data", data => {return imagePath.push(data.toString())});

      python.on("close", code => {
        res.send({imagePath});
        setTimeout(() => {
          (async () => {
            try {
              await fs.unlink(imagePath[0]);
            } catch (e) {
              console.log("error",e);
            }
          })();
        }, deleteImagesTime);
        console.log(`child process close all stdio with code ${code}`);
      });
    } catch (error) {
      console.log(error);
      return error;
    }
  } else res.send("Something went wrong with the data in radar Post Data");
});

app.listen(port, () =>
  console.log(`SickBot Backend is listening on port ${port}!`)
);
