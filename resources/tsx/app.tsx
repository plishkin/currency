import './components/Currency';

import Pusher from "pusher-js";
import Echo from "laravel-echo";

declare global {
    interface Window { Echo: Echo; Pusher: any}
}

window.Pusher = Pusher;

const env = import.meta.env;
const options = {
    broadcaster: 'pusher',
    key: env.VITE_PUSHER_APP_KEY,
    wsHost: window.location.hostname,
    wsPort: env.VITE_PUSHER_PORT ?? 80,
    cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
    forceTLS: false,
    enabledTransports: ['ws', 'wss'],
};

window.Echo = new Echo(options);


