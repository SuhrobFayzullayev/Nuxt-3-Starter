export interface SelectOption {
  label: string;
  value: string | number;
}

export interface TableColumn {
  prop: string;
  label: string;
  width?: number;
  minWidth?: number;
  align?: string;
  className?: string;
  formatter?: (row: any, column: any, cellValue: any, index: number) => any;
}

export interface Pagination {
  currentPage: number;
  perPage: number;
  total: number;
}

export interface MenuItem {
  label: string;
  path?: string;
  icon?: string;
  children?: MenuItem[];
}

export interface Option {
  phone: string;
  phone_2: string;
  email: string;
  email_2: string;
  address: string;
  address_2: string;
  google_map: string;
  yandex_map: string;
  facebook: string;
  instagram: string;
  telegram: string;
  vcontacte: string;
  twitter: string;
  youtube: string;
  linkedin: string;
  app_store: string;
  google_play: string;
  link: string;
  latitude: string;
  longitude: string;
  landmarks: string;
}

export type AviableOptionKeys =
  | "phone"
  | "phone_2"
  | "address"
  | "address_2"
  | "email"
  | "email_2"
  | "facebook"
  | "landmarks"
  | "instagram"
  | "google_map"
  | "telegram";

export type AviableOptions = Pick<Option, AviableOptionKeys>;

export interface Locales {
  id: AviableLocales;
  code: AviableLocales;
  file: string;
}
export type AviableLocales = "en";
