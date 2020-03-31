export interface ItalianLatests {
  data: string;
  stato: string;
  ricoverati_con_sintomi: number;
  terapia_intensiva: number;
  totale_ospedalizzati: number;
  isolamento_domiciliare: number;
  totale_positivi: number;
  variazione_totale_positivi: number;
  nuovi_positivi: number;
  dimessi_guariti: number;
  deceduti: number;
  totale_casi: number;
  tamponi: number;
  note_it: string;
  note_en: string;
}

export interface ItalianRegion {
  data: string;
  stato: string;
  codice_regione: number;
  denominazione_regione: string;
  lat: number;
  long: number;
  ricoverati_con_sintomi: number;
  terapia_intensiva: number;
  totale_ospedalizzati: number;
  isolamento_domiciliare: number;
  totale_positivi: number;
  variazione_totale_positivi: number;
  nuovi_positivi:number;
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
  lat: string;
  long: string;
  ricoverati_con_sintomi: number;
  terapia_intensiva: number;
  totale_ospedalizzati: number;
  isolamento_domiciliare: number;
  totale_positivi: number;
  variazione_totale_positivi: number;
  nuovi_positivi: number;
  dimessi_guariti: number;
  deceduti: number;
  totale_casi: number;
  tamponi: number;
  note_it: string;
  note_eng: string;
}

export interface ItalianProvince {
  data: string;
  stato: string;
  codice_regione: number;
  denominazione_regione: string;
  codice_provincia: number;
  denominazione_provincia: string;
  sigla_provincia: string;
  lat: number;
  long: number;
  totale_casi: number;
  note_it: string;
  note_end: string;
}

export interface ItalianProvinceLatests {
  data: string;
  stato: string;
  codice_regione: number;
  denominazione_regione: string;
  codice_provincia: number;
  denominazione_provincia: string;
  sigla_provincia: string;
  lat: number;
  long: number;
  totale_casi: number;
  note_it: string;
  note_end: string;
}