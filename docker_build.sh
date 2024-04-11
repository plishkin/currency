#!/usr/bin/env bash

#docker compose down -v
docker compose stop

#docker compose build --no-cache
docker compose build
docker compose up -d mysql
sleep 5
docker compose up -d laravel.test

mkdir -p bootstrap/cache
sudo chmod -R 0777 bootstrap/cache

docker compose exec laravel.test composer install --optimize-autoloader --ignore-platform-reqs
docker compose restart laravel.test
./vendor/bin/sail artisan config:clear
./vendor/bin/sail artisan migrate
docker compose up -d
./vendor/bin/sail npm install
./vendor/bin/sail npm run build

./vendor/bin/sail artisan app:update-currency
