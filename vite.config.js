import { defineConfig, loadEnv } from 'vite';
import laravel from 'laravel-vite-plugin';

export default ({ mode }) => {
    process.env = {...process.env, ...loadEnv(mode, process.cwd())};
    const env = process.env;
    return defineConfig({
        plugins: [
            laravel({
                input: [
                    'resources/sass/app.scss',
                    'resources/tsx/app.tsx',
                ],
                refresh: true,
            }),
        ],

        server: {
            port: parseInt(env.VITE_PORT),
        },
    });
}
