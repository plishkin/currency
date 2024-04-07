import './CurrencyLayoutBlock.scss';
import React, {useState, useEffect} from 'react';
import Loader from "../Loader/Loader";
import CurrenciesBlock from "./CurrenciesBlock/CurrenciesBlock";
import {ICurrency} from "../../Models/ICurrency";
import {ICurrencyCode} from "../../Models/ICurrencyCode";
import axios from "axios";

interface CurrencyBlockProps {
}

interface ICurrencyJson {
    currencies: ICurrency[],
    iso4217?: [],
    lastUpdated: number,
}

interface ICurrencyData {
    iso4217: ICurrencyCode[],
    currencies: ICurrency[],
    lastUpdated: number,
    lastLoaded: number,
}

const CurrencyLayoutBlock: React.FunctionComponent<CurrencyBlockProps> = (props: CurrencyBlockProps) => {

    const [loading, setLoading] = useState<boolean>(false);
    const [currencyData, setCurrencyData] =
        useState<ICurrencyData>({currencies: []} as ICurrencyData);

    const updateFromServer = () => {
        setLoading(true);
        axios.get('/currency', {
            headers: {
                Accept: "application/json"
            },
        }).then(resp => {
            setCurrencyData(mapData(resp.data as ICurrencyJson));
            setLoading(false);
        });
    }

    useEffect(() => {
        if (window.Echo) {
            window.Echo.connector.listen(
                'currency',
                'CurrencyUpdated',
                (json: ICurrencyJson) => setCurrencyData(mapData(json))
            )
        }
        updateFromServer();
    }, []);

    const mapData = (json: ICurrencyJson) => ({
        iso4217: json.iso4217.map(elem => {
            return {
                countryName: elem[0],
                currencyName: elem[1],
                codeName: elem[2],
                code: elem[3],
                number: elem[4]
            }
        }),
            lastLoaded: Date.now(),
            lastUpdated: json.lastUpdated,
            currencies: json.currencies,
    } as ICurrencyData);

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
                            <p><strong>Last loaded at: </strong><br/>{(new Date(currencyData.lastLoaded)).toLocaleString()}</p>
                        </div>
                        <div className="col-md-4">
                            <p><strong>Last updated from bank
                                at: </strong><br/>{(new Date(currencyData.lastUpdated * 1000)).toLocaleString()}</p>
                        </div>
                    </div>


                    <CurrenciesBlock currencies={currencyData.currencies} iso4217={currencyData.iso4217}/>
                </div>
            }
        </div>
    );

}

export default CurrencyLayoutBlock;
