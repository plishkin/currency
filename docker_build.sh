#!/usr/bin/env bash

#docker compose down -v
docker compose stop

#docker compose build --no-cache
docker compose build
docker compose up -d mysql
sleep 5
docker compose up -d laravel.test
docker compose exec laravel.test composer install --optimize-autoloader --ignore-platform-reqs
./vendor/bin/sail artisan config:clear
./vendor/bin/sail artisan migrate
docker compose up -d
./vendor/bin/sail npm install
./vendor/bin/sail npm run build
