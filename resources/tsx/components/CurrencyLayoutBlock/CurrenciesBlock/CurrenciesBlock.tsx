import './CurrenciesBlock.scss';
import React, { useState, useCallback, useEffect } from 'react';
import CurrencyBlock from './CurrencyBlock/CurrencyBlock';
import { ICurrency } from '../../../Models/ICurrency';
import { ICurrencyCode } from '../../../Models/ICurrencyCode';

interface CurrenciesBlockBlockProps {
  currencies: ICurrency[];
  iso4217: ICurrencyCode[];
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
            <CurrencyBlock
              currency={currency}
              iso4217={props.iso4217}
              idx={idx}
              key={idx}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CurrenciesBlock;
