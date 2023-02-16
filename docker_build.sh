#!/usr/bin/env bash

sudo chmod -R 0777 ./storage ./bootstrap/cache ./public
sudo chown -R www-data ./storage ./bootstrap/cache ./public

docker-compose build && docker-compose up -d

docker-compose exec fpm composer install
docker-compose exec fpm php artisan optimize:clear
docker-compose exec fpm php artisan migrate
docker-compose exec fpm php artisan currency:update
