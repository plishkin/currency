FROM php:8.0-fpm

RUN apt-get update
RUN apt-get install curl -y
RUN apt-get install git -y
RUN apt-get install -y libzip-dev zip
RUN docker-php-ext-install pdo pdo_mysql zip
RUN pecl install -o -f redis \
    &&  rm -rf /tmp/pear \
    &&  docker-php-ext-enable redis

COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer

WORKDIR /var/www


