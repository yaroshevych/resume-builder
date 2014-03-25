'use strict';

var express = require('express');
var path = require('path');
var app = express();
var port = 3000;
var intel = require('intel');

intel.config({
    formatters: {
        'simple': {
            'format': '[%(levelname)s] %(message)s',
            'colorize': true
        },
        'details': {
            'format': '[%(date)s] %(name)s.%(levelname)s: %(message)s',
            'datefmt': '%Y-%m-%d %H:%M-%S.%L'
        }
    },
    handlers: {
        'terminal': {
            'class': intel.handlers.Console,
            'formatter': 'simple',
            'level': intel.VERBOSE
        },
        'logfile': {
            'class': intel.handlers.Rotating,
            'level': intel.DEBUG,
            maxSize: 1000000,
            maxFiles: 10,
            'file': 'logs/app.log',
            'formatter': 'details'
        }
    },
    loggers: {
        'root': {
            'handlers': ['logfile', 'terminal'],
            'level': 'VERBOSE',
            'handleExceptions': true,
            'exitOnError': false,
            'propagate': false
        },
        'root.node_modules.express': { // huh what? see below :)
            'handlers': ['terminal'],
            'level': 'VERBOSE'
        }
    }
});

intel.console();

app.use(express.compress());

if (process.env.NODE_ENV === 'production') {
    app.use('/', express['static'](path.join(__dirname, '/dist'), {
        maxAge: 31557600000 // one year
    }));
} else {
    app.use('/scripts', express['static'](path.join(__dirname, '/.tmp/scripts'), {
        maxAge: 0
    }));

    app.use('/', express['static'](path.join(__dirname, '/client'), {
        maxAge: 0
    }));
}

app.use(function(req, res, next) {
    intel.debug('+ %s %s', req.method, req.url);

    req.on('end', function() {
        intel.debug('- %s %s', req.method, req.url);
    });

    next();
});

app.get('/', function(req, res) {
    res.redirect('/index.html');
});

app.listen(process.env.PORT || port);
console.log('Express started on port ' + port + ', environment: ' + process.env.NODE_ENV);

