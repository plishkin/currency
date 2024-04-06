#!/usr/bin/env bash

#docker compose down -v
#docker compose stop
./vendor/bin/sail build --no-cache
./vendor/bin/sail up -d
sleep 5
./vendor/bin/sail composer install --optimize-autoloader
./vendor/bin/sail artisan config:clear
./vendor/bin/sail artisan migrate
