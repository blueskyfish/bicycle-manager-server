
# Bicycle Manager Server


## Install

Repuirement:

* The [NodeJS](http://nodejs.org) is required
* A running MySQL database

Shell

```bash
$ git clone https://github.com/blueskyfish/bicycle-manager-server.git
$ npm install
```

## Start server

There are three settings:

* Settings over the enviroment
* Settings over parameter by start
* Settings over json file.

### Program parameter

```bash
$ node server.js --mode=prod [--host=127.0.0.1] [--port=8800] [--password=xxx]
```

Overview

| Parameter      | Type        | Required                  | Description
|----------------|-------------|---------------------------|----------------------------------
| mode           | string      | yes (no: see Environment) | Describes the running mode. There are some modes: `local`, `test` and `prod`.
| port           | int         | no (8800)                 | The listen port.
| host           | string      | no (localhost)            | The host of the server

### Environment

```bash
export BICYCLE_HOME=/path/to/bicycle/home/folder
export BICYCLE_SALT=password
```

Overview

| Environment             | Type     | Required       | Description
|-------------------------|----------|----------------|----------------------
| `BICYCLE_HOME`          | string   | yes            | The folder for the pid and logging
| `BICYCLE_MODE`          | string   | no             | The running mode. Only when running the mocha test.
| `BICYCLE_SALT`          | string   | no             | The password salt for encrypt or decrypt passwords

### JSON File

```json
{
  "db": {
    "host": "localhost",
    "port": 3306,
    "user": "user",
    "password": "encrypted password",
    "database": "database name"
  }
}
```

## Endpoints

Every request needs the header field `x-bicycle-token` (except about). This header field contains your
unique token from your password.

### About

```
GET /about
```

### Battery List

```
GET /battery
```

### New Battery

```
POST /battery
```

### Modified Battery

```
PUT /battery/:id
```

### Delete Battery

```
DELETE /battery/:id
```

## License

```
The MIT License (MIT)

Copyright (c) 2015 BlueSkyFish
```
