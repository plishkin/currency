import axios from 'axios';
import { ICurrenciesResponse } from '../@types/responces/ICurrenciesResponse';

export type TTarget = 'cache' | 'api';

export const getCurrenciesFromServer = async (target: TTarget) => {
  return axios
    .get(target === 'api' ? '/currency/api' : '/currency/cached', {
      headers: {
        Accept: 'application/json'
      }
    })
    .then(response => {
      return response.data as ICurrenciesResponse;
    });
};
