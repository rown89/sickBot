/**
 * @param title Choosen word to colorize
 * @param color Choosen Color
 * @param item object with covid stats
 */

export const covidHelp = (title: string, color: number, data) => {
  return {
    title: `${title}`,
    color: color,
    thumbnail: {
      url: "http://danilomongelli.it/sickBot/assets/COVID-19-Logo.png"
    },
    fields: [
      {
        name: "Last data about Italy:",
        value: data[0],
      },
      {
        name: "Last data about picked Italian Region:",
        value: data[1],
      },
      {
        name: "Last data about picked Italian Province:",
        value: data[2],
      },
      {
        name: "Stacked Bar Chart with Region data between two dates:",
        value: data[3],
      },
      {
        name: "Radar Chart with Region data between two dates",
        value: data[4],
      },
      {
        name: "Stacked Bar Chart with Province data between two dates:",
        value: data[5],
      },
    ]
  };
};


export const covidMessage = (title: string, color: number, data) => {
  const item = data;
  return {
    title: `${title}`,
    color: color,
    timestamp: `${item.data}`,
    footer: {
      icon_url:
        "https://r7.hiclipart.com/path/775/178/340/iphone-emoji-apple-clip-art-sick-8d081a33bc88263bd858d457cb8e2640.png",
      text: "last update " + item.data
    },
    thumbnail: {
      url: "http://danilomongelli.it/sickBot/assets/COVID-19-Logo.png"
    },
    author: {
      name: "Protezione civile",
      url: "https://github.com/pcm-dpc/COVID-19",
      icon_url:
        "https://upload.wikimedia.org/wikipedia/it/thumb/d/d6/Dipartimento_della_Protezione_Civile.svg/600px-Dipartimento_della_Protezione_Civile.svg.png"
    },
    fields: [
      {
        name: "All Cases",
        value: `${item.totale_casi}`
      },
      {
        name: "Infections",
        value: `${item.totale_positivi}`
      },
      {
        name: "infections today",
        value: `${item.nuovi_positivi}`
      },
      ,
      {
        name: "infections variation from previous day",
        value: `${item.variazione_totale_positivi}`
      },
      {
        name: "Intensive care",
        value: `${item.terapia_intensiva}`
      },
      {
        name: "Hospitalized with symptoms",
        value: `${item.ricoverati_con_sintomi}`
      },
      {
        name: "All Hospitalized",
        value: `${item.totale_ospedalizzati}`
      },
      {
        name: "People in isolation",
        value: `${item.isolamento_domiciliare}`
      },
      {
        name: "People recovered and discharged from Hospital",
        value: `${item.dimessi_guariti}`
      },
      {
        name: "Corona Virus Tests",
        value: `${item.tamponi}`
      },
      {
        name: "Deaths",
        value: `${item.deceduti}\n`
      }
    ]
  };
};

export const covidProvince = (title: string, color: number, data) => {
  const item = data;
  return {
    title: `${title}`,
    color: color,
    timestamp: `${item.data}`,
    footer: {
      icon_url:
        "https://r7.hiclipart.com/path/775/178/340/iphone-emoji-apple-clip-art-sick-8d081a33bc88263bd858d457cb8e2640.png",
      text: "last update " + item.data
    },
    thumbnail: {
      url: "http://danilomongelli.it/sickBot/assets/COVID-19-Logo.png"
    },
    author: {
      name: "Protezione civile",
      url: "https://github.com/pcm-dpc/COVID-19",
      icon_url:
        "https://upload.wikimedia.org/wikipedia/it/thumb/d/d6/Dipartimento_della_Protezione_Civile.svg/600px-Dipartimento_della_Protezione_Civile.svg.png"
    },
    fields: [
      {
        name: "Total cases",
        value: `${item.totale_casi}\n`
      }
    ]
  };
};
