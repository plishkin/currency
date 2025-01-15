import './CurrencyBlock.scss';
import React from 'react';
import ICurrency from '../../../../@types/models/ICurrency';

interface CurrencyBlockProps {
  idx: number;
  currency: ICurrency;
}

const CurrencyBlock: React.FunctionComponent<CurrencyBlockProps> = (
  props: CurrencyBlockProps
) => {
  const c = props.currency;
  const date = new Date(c.date * 1000);
  return (
    <tr className="currency-row" key={props.idx}>
      <td>
        <strong title={c.from}>{c.from}</strong>
      </td>
      <td>
        <strong title={c.to}>{c.to}</strong>
      </td>
      <td>{c.buy}</td>
      <td>{c.sell}</td>
      <td>{date.toLocaleString()}</td>
    </tr>
  );
};

export default CurrencyBlock;
