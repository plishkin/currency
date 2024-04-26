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

Copy and configure .env file

by default APP_PORT is 8082

```bash
cp .env.example .env
```


### Up and running with docker

#### Make sure you use docker at least 26.0 version
#### Run build script

```bash
bash docker_build.sh
```

### Visit in your browser

http://localhost:8082

### Run tests

#### Backend

```bash
docker compose exec laravel.test php artisan test
```

#### Frontend

```bash
docker compose exec laravel.test npm run test
```
