## Simple sample application that shows currency rate

![scrrenshot](https://raw.githubusercontent.com/plishkin/currency/main/screenshot.png)

### Interaction diagram

![diagram](https://raw.githubusercontent.com/plishkin/currency/main/diagram.svg)

### Uses

- **[Laravel](https://laravel.com/)**
- **[Typescript](https://www.typescriptlang.org/)**
- **[ReactJS](https://reactjs.org/)**
- **[SCSS](https://sass-lang.com/)**
- **[WebSocket](https://en.wikipedia.org/wiki/WebSocket)**
- **[Docker](https://www.docker.com/)**

## Installation

### Clone the project with git

```bash
git clone https://github.com/plishkin/currency.git
```

Go to the cloned project folder

```bash
cd currency
```

### Up and running with docker

#### Method 1: run commands manually

Folders permissions

```bash
sudo chmod -R 0777 ./storage ./bootstrap/cache ./public
```

```bash
sudo chown -R www-data ./storage ./bootstrap/cache ./public
```

Build and run docker

```bash
docker-compose build && docker-compose up -d
```

Run setup commands in container

```bash
docker-compose exec fpm composer install
```

```bash
docker-compose exec fpm php artisan optimize:clear
```

```bash
docker-compose exec fpm php artisan migrate
```

```bash
docker-compose exec fpm php artisan currency:update
```

#### Method 2: run build script 
```bash
bash docker_build.sh
```

### Visit in your browser

http://localhost:8082 
