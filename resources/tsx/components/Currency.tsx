import React from 'react';
import {createRoot} from 'react-dom/client';
import CurrencyLayoutBlock from "./CurrencyLayoutBlock/CurrencyLayoutBlock";

const container = document.getElementById('root');
if (container) {
    const root = createRoot(container);
    root.render(<CurrencyLayoutBlock />)
}

