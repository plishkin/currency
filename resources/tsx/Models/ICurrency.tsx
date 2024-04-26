import { ICurrencyCode } from './ICurrencyCode';

export interface ICurrency {
  currencyCodeA: number;
  currencyCodeB: number;
  date: number;
  rateBuy: number;
  rateSell: number;
}

export interface ICurrencyBase {
  currencies: ICurrency[];
  lastUpdated: number;
}

export interface ICurrencyJson extends ICurrencyBase {
  iso4217?: [];
}

export interface ICurrencyData extends ICurrencyBase {
  iso4217: ICurrencyCode[];
  lastLoaded: number;
}
