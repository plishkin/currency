import './CurrenciesBlock.scss';
import React from 'react';
import CurrencyBlock from './CurrencyBlock/CurrencyBlock';
import ICurrency from '../../../@types/models/ICurrency';

interface CurrenciesBlockBlockProps {
  currencies: ICurrency[];
}

const CurrenciesBlock: React.FunctionComponent<CurrenciesBlockBlockProps> = (
  props: CurrenciesBlockBlockProps
) => {
  return (
    <div className="currencies-container">
      <table className="table table-striped table-bordered currencies-table">
        <thead>
          <tr>
            <td>From</td>
            <td>To</td>
            <td>Buy</td>
            <td>Sell</td>
            <td>Date</td>
          </tr>
        </thead>
        <tbody>
          {props.currencies.map((currency, idx) => (
            <CurrencyBlock currency={currency} idx={idx} key={idx} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CurrenciesBlock;
