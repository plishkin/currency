import IResponse from './IResponse';
import ICurrency from '../models/ICurrency';

export interface ICurrenciesResponse extends IResponse {
  currencies: ICurrency[];
  lastUpdated: number;
  error?: string;
}
