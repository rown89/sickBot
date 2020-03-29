/**
 * @param word Choosen word to colorize
 * @param color Choosen Color
 */

export const color = (word: string, color: string) => {
  switch (color) {
    case "yellow":
      () => {
        return " `HTTP` " + word + "`";
      };
      break;
    case "cyan":
      () => {
        return " `YAML` " + word + "`";
      };
      break;
    case "red":
      () => {
        return " `excel` " + word + "`";
      };
      break;
    case "blue":
      () => {
        return " `Elm` " + word + "`";
      };
      break;
    case "orange":
      () => {
        return " `ARM` " + word + "`";
      };
      break;
    case "green":
      () => {
        return " `CSS` " + word + "`";
      };
      break;
    default:
      break;
  }
};

/**
 * @param title Choosen word to colorize
 * @param color Choosen Color
 * @param item object with covid stats
 */

export const covidMessage = (title: string, color: number, data: any) => {
  console.log(data)
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
        value: `${item.totale_casi}`
      },
      {
        name: "People positive to the infection",
        value: `${item.totale_attualmente_positivi}`
      },
      {
        name: "New People positive to the infection",
        value: `${item.nuovi_attualmente_positivi}`
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
        name: "All Hospitalized people with symptoms",
        value: `${item.totale_ospedalizzati}`
      },
      {
        name: "People in isolation",
        value: `${item.isolamento_domiciliare}`
      },
      {
        name: "People recovered and discharged from hospital",
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

export const covidProvince = (title: string, color: number, data: any) => {
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