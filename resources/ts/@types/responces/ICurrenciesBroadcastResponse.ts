import IResponse from './IResponse';
import ICurrency from '../models/ICurrency';

export default interface ICurrenciesBroadcastResponse extends IResponse {
  currencies: ICurrency[];
  lastUpdated: number;
  error: string;
}
