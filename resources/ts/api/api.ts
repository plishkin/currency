import axios from 'axios';
import { ICurrenciesResponse } from '../@types/responces/ICurrenciesResponse';
import IResponse from '../@types/responces/IResponse';

export type TTarget = 'cache' | 'api';

export const getCurrenciesFromServer = async () => {
  return axios
    .get('/currency/cached', {
      headers: {
        Accept: 'application/json'
      }
    })
    .then(response => {
      return response.data as ICurrenciesResponse;
    });
};

export const updateCurrenciesFromApi = async () => {
  return axios
    .get('/currency/api', {
      headers: {
        Accept: 'application/json'
      }
    })
    .then(response => {
      return response.data as IResponse;
    });
};
