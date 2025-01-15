import './CurrencyLayoutBlock.scss';
import React, { useState, useEffect } from 'react';
import Loader from '../Loader/Loader';
import CurrenciesBlock from './CurrenciesBlock/CurrenciesBlock';
import { useBroadcast } from '../../hooks/useBroadcast';
import ICurrency from '../../@types/models/ICurrency';
import { getCurrenciesFromServer, TTarget } from '../../api/api';
import ICurrenciesBroadcastResponse from '../../@types/responces/ICurrenciesBroadcastResponse';
import Alert, { IAlert } from '../Alert/Alert';
import { failAlert } from '../_utils/alerts';
import IFailResponse from '../../@types/responces/IFailResponse';

export interface CurrencyBlockProps {}

const CurrencyLayoutBlock: React.FunctionComponent<CurrencyBlockProps> = (
  props: CurrencyBlockProps
) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [currencies, setCurrencies] = useState<ICurrency[]>([]);
  const [alert, setAlert] = useState<IAlert | null>(null);
  const [lastLoaded, setLastLoaded] = useState<number | null>(null);
  const [lastUpdated, setLastUpdated] = useState<number | null>(null);
  const { listen } = useBroadcast();

  const updateFromServer = (target: TTarget) => {
    setLoading(true);
    getCurrenciesFromServer(target)
      .then(resp => {
        setCurrencies(resp.currencies || []);
        setLastUpdated(resp.lastUpdated || null);
        if (resp.error)
          setAlert({
            text: resp.error,
            dismissible: true,
            type: 'danger'
          });
      })
      .catch(e => {
        setAlert(failAlert(e.response.data as IFailResponse));
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    updateFromServer('cache');

    listen(
      'currencies',
      'CurrencyUpdatedBroadcastEvent',
      (data: ICurrenciesBroadcastResponse) => setCurrencies(data.currencies)
    );
  }, []);

  return (
    <div>
      <h2>Monobank currencies</h2>
      <hr />
      {alert && (
        <>
          <Alert {...alert} />
          <hr />
        </>
      )}
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
                {new Date(lastLoaded).toLocaleString()}
              </p>
            </div>
            <div className="col-md-4">
              <p>
                <span
                  className="btn btn-lg btn-success"
                  onClick={() => updateFromServer('cache')}
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
                  onClick={() => updateFromServer('api')}
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
