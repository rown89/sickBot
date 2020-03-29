export interface ItalianLatests {
  data: string;
  stato: string;
  ricoverati_con_sintomi: number;
  terapia_intensiva: number;
  totale_ospedalizzati: number;
  isolamento_domiciliare: number;
  totale_attualmente_positivi: number;
  nuovi_attualmente_positivi: number;
  dimessi_guariti: number;
  deceduti: number;
  totale_casi: number;
  tamponi: number;
}

export interface ItalianRegion {
  data: string;
  stato: string;
  codice_regione: number;
  denominazione_regione: string;
  ricoverati_con_sintomi: number;
  terapia_intensiva: number;
  totale_ospedalizzati: number;
  isolamento_domiciliare: number;
  totale_attualmente_positivi: number;
  nuovi_attualmente_positivi: number;
  dimessi_guariti: number;
  deceduti: number;
  totale_casi: number;
  tamponi: number;
  note_it: string,
  note_eng: string
}

export interface ItalianRegionLatests {
  data: string;
  stato: string;
  codice_regione: number;
  denominazione_regione: string;
  ricoverati_con_sintomi: number;
  terapia_intensiva: number;
  totale_ospedalizzati: number;
  isolamento_domiciliare: number;
  totale_attualmente_positivi: number;
  nuovi_attualmente_positivi: number;
  dimessi_guariti: number;
  deceduti: number;
  totale_casi: number;
  tamponi: number;
}

export interface ItalianProvinceLatests {
  data: string;
  stato: string;
  codice_regione: number;
  denominazione_regione: string;
  ricoverati_con_sintomi: number;
  codice_provincia: number;
  denominazione_provincia: string;
  sigla_provincia: string;
  lat: number;
  long: number;
  totale_casi: number;
}