FROM php:8.0-fpm

RUN apt-get update
RUN apt-get install curl -y
RUN apt-get install git -y
RUN apt-get install iputils-ping -y
RUN docker-php-ext-install pdo pdo_mysql
RUN pecl install redis && docker-php-ext-enable redis
RUN apt-get install supervisor -y
RUN apt-get install mc -y

COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer

COPY docker/configs/supervisor.conf /etc/supervisor/conf.d/supervisor.conf

WORKDIR /var/www/app

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisor.conf"]


