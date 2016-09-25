
![Bicycle Server](logo.png)

# Bicycle Server

> The bicycle backend. It is a micro server programming in javascript and running with node js. The micro server save all bicycle things

_Generates with [Yeoman][yeoman] and the generator <https://github.com/blueskyfish/generator-express-restful-mysql.git>._

## Table of Content

* [TODOs](#user-content-todos)
* [Execute the Application](#user-content-execute-the-application)
* [Endpoints](#user-content-endpoints)
* [Deployment](#user-content-deployment)
	* [Parameters](#user-content-parameters)
	* [Setting File](#user-content-setting-file)
* [Home Directory](#user-content-home-directory)
* [Logging](#user-content-logging)
* [Generate Documentation](#user-content-generate-documentation)
* [License](#user-content-license)

## TODOs

Some settings or replacement cannot be done with the generator. After doing this, you can delete this section.

* Replace the Logo (`logo.png`).

## Execute the Application

```sh
$ node server.js [--verbose | -v] [--help] --config=/path/to/configuration.json
```

## Endpoints

> **Note**: If the tool `apidoc` is installed, you can view the documentation on Endpoints in directory `apidoc`.


## Deployment

Deploying of the application needs some settings on the computer machine.

* Parameters
* Setting File

### Parameters

Name                | Type    | Required | Description
--------------------|---------|----------|-------------------------------------------
`--verbose` | `-v`  | boolean | no       | Show more logging messages
`--help`            | boolean | no       | Shows the help
`--config=/path/to` | string  | yes      | The filename with the path to the configuration json file.


### Setting File

> An Example of the settings is finding at `settings.example.json`

Name                | Type    | Default     | Description
--------------------|---------|-------------|------------------------------------------
`server.host`       | string  | `localhost` | The server host for listening.
`server.port`       | number  | `40080`     | The server port for listening
`db.host`           | string  | `localhost` | The database host.
`db.port`           | number  | `3306`      | The database port.
`db.user`           | string  |             | The database user.
`db.password`       | string  |             | The password for the database user.
`db.database`       | string  |             | The database name.
`logger.config`     | object  |             | The namespace configuration of the logger.
`logger.separator`  | string  | `.`         | The separator for the namespace.
`logger.appender`   | string  | `console`   | The appender setting (`console` or `file`).


**Example:**

```json
{
    "server": {
        "host": "127.0.0.1",
        "port": 65001
    },
    "db": {
        "port": 3306,
        "host": "localhost",
        "user": "database user",
        "password": "database password",
        "database": "datebase name",
        "connectionLimit": 10
    },
    "logger": {
        "config": {
            "root": "info",
            "temo": "debug",
            "temo.db": "debug",
            "temo.shutdown": "info"
        },
        "separator": ".",
        "appender": "console"
    }
}
```


## Home Directory

The home directory is calculated from the configuration filename.

*Note: The pid file is written in the home directory!*

**Sub Directories**

* `logs` The log files are stored in this directory.


## Logging

There are 2 types as the log messages are written.

* `console`: The log messages are written to the console.
* `file`: The log messages are written into a file.

The setting `logger.appender` controls the writing of the log messages.

## Generate Documentation

There are to commands for generating the jsDoc and the apidoc for the endpoints:

* jsDoc: `npm run jsdoc` generates the jsdoc in the directory `jsdoc`
* apidoc: `npm run apidoc` generates the apidoc of the endpoints in the directory `apidoc`.

**Steps**

```sh
$ npm run jsdoc
$ npm run apidoc
```


## License

```
The MIT License (MIT)

Copyright (c) <year> <copyright holders>

Permission is hereby granted, free of charge, to any person obtaining a copy of this
software and associated documentation files (the "Software"), to deal in the Software
without restriction, including without limitation the rights to use, copy, modify,
merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be included in all copies
or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```


[github]: https://github.com
[yeoman]: http://yeoman.io
