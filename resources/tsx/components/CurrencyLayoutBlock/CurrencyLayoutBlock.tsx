import './CurrencyLayoutBlock.scss';
import React, {useState, useEffect} from 'react';
import Loader from "../Loader/Loader";
import CurrenciesBlock from "./CurrenciesBlock/CurrenciesBlock";
import {ICurrency} from "../../Models/ICurrency";
import {ICurrencyCode} from "../../Models/ICurrencyCode";
import axios from "axios";
import {Simulate} from "react-dom/test-utils";
import load = Simulate.load;

interface CurrencyBlockProps {
}

interface CurrencyJson {
    currencies: ICurrency[],
    iso4217?: [],
    lastUpdated: number,
}

const CurrencyLayoutBlock: React.FunctionComponent<CurrencyBlockProps> = (props: CurrencyBlockProps) => {

    const [loading, setLoading] = useState<boolean>(false);
    const [currencies, setCurrencies] = useState<ICurrency[]>([]);
    const [iso4217, setIso4217] = useState<ICurrencyCode[]>([]);
    const [lastLoaded, setLastLoaded] = useState<number>(0);
    const [lastUpdated, setLastUpdated] = useState<number>(0);

    const updateFromServer = () => {
        setLoading(true);
        axios.get('/currency', {
            headers: {
                Accept: "application/json"
            },
        }).then(resp => {
            const json: CurrencyJson = resp.data;
            const iso4217: ICurrencyCode[] = json.iso4217.map(elem => {
                return {
                    countryName: elem[0],
                    currencyName: elem[1],
                    codeName: elem[2],
                    code: elem[3],
                    number: elem[4]
                }
            })
            setIso4217(iso4217);
            setCurrencies(json.currencies);
            setLastUpdated(json.lastUpdated);
            setLastLoaded(Date.now());
            setLoading(false);
        });
    }

    useEffect(() => {
        if (!iso4217.length) {
            if (window.Echo) {
                window.Echo.connector.listen('currency', 'CurrencyUpdated', (json: CurrencyJson) => {
                    setCurrencies(json.currencies);
                    setLastUpdated(json.lastUpdated);
                    setLastLoaded(Date.now());
                })
            }
            updateFromServer();
        }
    }, []);

    return (
        <div>
            <h2>Monobank currencies</h2>
            {loading &&
                <div className="currency-loader">
                    <Loader height='100%'/>
                </div>
            }
            {!loading &&
                <div className="currencies-layout">
                    <div className="row">
                        <div className="col-md-4">
                            <p>
                                <span className="btn btn-lg btn-success"
                                      onClick={() => updateFromServer()}
                                >Update From Server</span>
                            </p>
                        </div>
                        <div className="col-md-4">
                            <p><strong>Last loaded at: </strong><br />{(new Date(lastLoaded)).toLocaleString()}</p>
                        </div>
                        <div className="col-md-4">
                            <p><strong>Last updated from bank at: </strong><br />{(new Date(lastUpdated * 1000)).toLocaleString()}</p>
                        </div>
                    </div>


                    <CurrenciesBlock currencies={currencies} iso4217={iso4217}/>
                </div>
            }
        </div>
    );

}

export default CurrencyLayoutBlock;
