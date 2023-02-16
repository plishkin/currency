#!/usr/bin/env bash

docker-compose stop

docker-compose build
docker-compose up -d

sudo chmod -R 0777 ./storage
sudo chmod -R 0777 ./bootstrap/cache
sudo chmod -R 0777 ./public
sudo chown -R www-data ./storage
sudo chown -R www-data ./bootstrap/cache
sudo chown -R www-data ./public

docker-compose exec fpm composer dump-autoload
docker-compose exec fpm php artisan optimize:clear
docker-compose exec fpm php artisan migrate
