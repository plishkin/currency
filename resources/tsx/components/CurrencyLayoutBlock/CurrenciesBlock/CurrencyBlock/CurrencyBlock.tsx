import './CurrencyBlock.scss';
import React, {useState, useCallback, useEffect} from 'react';
import {ICurrency} from "../../../../Models/ICurrency";
import {ICurrencyCode} from "../../../../Models/ICurrencyCode";

interface CurrencyBlockProps {
    idx: number
    currency: ICurrency
    iso4217: ICurrencyCode[]
}

const CurrencyBlock: React.FunctionComponent<CurrencyBlockProps> = (props: CurrencyBlockProps) => {

    const c = props.currency;
    const getIso = (code: number) => props.iso4217.find(elem => elem.code == code);
    const code1: ICurrencyCode = getIso(c.currencyCodeA);
    const code2: ICurrencyCode = getIso(c.currencyCodeB);
    if (!code1 || !code2) return null;
    const date = new Date(c.date * 1000);
    return (
        <tr className="currency-row" key={props.idx}>
            <td><strong title={code1.currencyName}>{code1.codeName}</strong></td>
            <td><strong title={code2.currencyName}>{code2.codeName}</strong></td>
            <td>{c.rateBuy}</td>
            <td>{c.rateSell}</td>
            <td>{date.toLocaleString()}</td>
        </tr>
    );
}

export default CurrencyBlock;
