import './CurrencyLayoutBlock.scss';
import React, { useState, useEffect } from 'react';
import Loader from '../Loader/Loader';
import CurrenciesBlock from './CurrenciesBlock/CurrenciesBlock';
import { useBroadcast } from '../../hooks/useBroadcast';
import ICurrency from '../../@types/models/ICurrency';
import {
  getCurrenciesFromServer,
  TTarget,
  updateCurrenciesFromApi
} from '../../api/api';
import ICurrenciesBroadcastResponse from '../../@types/responces/ICurrenciesBroadcastResponse';
import Alert, { IAlert } from '../Alert/Alert';
import {
  errorAlert,
  errorWhileUpdatingAlert,
  failAlert,
  infoAlert,
  successfullyUpdatedAlert
} from '../_utils/alerts';
import IFailResponse from '../../@types/responces/IFailResponse';
import { ICurrenciesResponse } from '../../@types/responces/ICurrenciesResponse';

export interface CurrencyBlockProps {}

const CurrencyLayoutBlock: React.FunctionComponent<CurrencyBlockProps> = (
  props: CurrencyBlockProps
) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [currencies, setCurrencies] = useState<ICurrency[]>([]);
  const [alerts, setAlerts] = useState<IAlert[] | []>([]);
  const [lastLoaded, setLastLoaded] = useState<Date>(new Date());
  const [lastUpdated, setLastUpdated] = useState<number | null>(null);
  const { listen } = useBroadcast();

  const handleUpdate = (resp: ICurrenciesResponse) => {
    setCurrencies(resp.currencies || []);
    setLastUpdated(resp.lastUpdated || null);
    const ll = new Date();
    setLastLoaded(ll);
    const als = [...alerts];
    if (resp.success) als.push(successfullyUpdatedAlert(ll));
    else als.push(errorWhileUpdatingAlert(ll));
    if (resp.error) als.push(errorAlert(resp.error));
    if (resp.message) als.push(infoAlert(resp.message));
    setAlerts(als);
  };

  const updateFromServer = () => {
    setLoading(true);
    getCurrenciesFromServer()
      .then(resp => handleUpdate(resp))
      .catch(e => {
        setAlerts([...alerts, failAlert(e.response.data as IFailResponse)]);
      })
      .finally(() => setLoading(false));
  };

  const updateFromAPI = () => {
    setLoading(true);
    updateCurrenciesFromApi()
      .then(resp => {
        setAlerts([...alerts, infoAlert(resp.message)]);
      })
      .catch(e => {
        setAlerts([...alerts, failAlert(e.response.data as IFailResponse)]);
      });
  };

  useEffect(() => {
    updateFromServer();

    listen(
      'currencies',
      'CurrencyUpdatedBroadcastEvent',
      (resp: ICurrenciesBroadcastResponse) => {
        setAlerts([]);
        handleUpdate(resp);
        setLoading(false);
      }
    );
  }, []);

  return (
    <div>
      <h2>Monobank currencies</h2>
      <hr />
      {alerts.map((alert, idx) => (
        <Alert key={`${alert.text} - ${lastLoaded} - ${idx}`} {...alert} />
      ))}
      {loading && (
        <div className="currency-loader">
          <Loader height="100%" />
        </div>
      )}
      {!loading && (
        <div className="currencies-layout">
          <div className="row">
            <div className="col-md-2">
              <p>
                <strong>Last loaded at: </strong>
                <br />
                {lastLoaded.toLocaleString()}
              </p>
            </div>
            <div className="col-md-4">
              <p>
                <span
                  className="btn btn-lg btn-success"
                  onClick={() => updateFromServer()}
                >
                  Update From Server Cache
                </span>
              </p>
            </div>

            <div className="col-md-2">
              <p>
                <strong>Last updated from bank at: </strong>
                <br />
                {new Date(lastUpdated * 1000).toLocaleString()}
              </p>
            </div>
            <div className="col-md-4">
              <p>
                <span
                  className="btn btn-lg btn-success"
                  onClick={() => updateFromAPI()}
                >
                  Update From Monobank API
                </span>
              </p>
            </div>
          </div>
          <CurrenciesBlock currencies={currencies} />
        </div>
      )}
    </div>
  );
};

export default CurrencyLayoutBlock;
