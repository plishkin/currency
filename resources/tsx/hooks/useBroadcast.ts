import Pusher from 'pusher-js';
import Echo from 'laravel-echo';

declare global {
  interface Window {
    Echo: Echo;
    Pusher: any;
  }
}

const init = () => {
  window.Pusher = Pusher;
  const env = import.meta.env;
  const options = {
    broadcaster: 'reverb',
    key: env.VITE_REVERB_APP_KEY,
    wsHost: env.VITE_REVERB_HOST,
    wsPort: env.VITE_REVERB_PORT,
    wssPort: env.VITE_REVERB_PORT,
    forceTLS: (env.VITE_REVERB_SCHEME ?? 'https') === 'https',
    enabledTransports: ['ws', 'wss']
  };
  window.Echo = new Echo(options);
};

const register = (
  name: string,
  event: string,
  callBack: (data: object) => void
) => {
  window.Echo.connector.listen(name, event, (data: object) => callBack(data));
};

export const useBroadcast = () => {
  const listen = (
    name: string,
    event: string,
    callBack: (data: object) => void
  ) => {
    register(name, event, callBack);
  };

  if (!window.Echo) init();

  return {
    listen
  };
};
