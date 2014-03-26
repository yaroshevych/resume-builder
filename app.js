'use strict';

var express = require('express'),
    path = require('path'),
    app = express(),
    session = require('./middleware/session'),
    passport = session.init(app),
    port = 3000,
    intel = require('intel'),
    mongoose = require('mongoose'),
    initIntel = function() {
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
    },
    initMongoose = function() {
        var connectionString = 'mongodb://localhost/resume-builder';

        mongoose.set('debug', true);

        mongoose.connect(connectionString, {
            db: {
                safe: true
            }
        }, function(err, res) {
            if (err) {
                console.log('ERROR connecting to: ' + connectionString + '. ' + err);
            } else {
                console.log('Successfully connected to: ' + connectionString);
            }
        });
    };

initIntel();

app.use(express.favicon());
app.use(express.compress());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('cfacee66-586e-4cfe-be97-86c42870f064')); //default secret - will have to be changed
app.use(express.bodyParser());

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

    intel.info('Adding latency to simulate real-life connection...');
    app.use(function(req, res, next) {
        setTimeout(next, 50);
    });
}

app.use(express.cookieSession({
    cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    }
})); // keep sessions small, so no need to persist info in DB

app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
    intel.debug('+ %s %s', req.method, req.url);

    req.on('end', function() {
        intel.debug('- %s %s', req.method, req.url);
    });

    next();
});

app.use(app.router);

require('./routes')(app);
require('./models')(app);

app.get('/', function(req, res) {
    res.redirect('/index.html');
});

app.listen(process.env.PORT || port);
console.log('Express started on port ' + port + ', environment: ' + process.env.NODE_ENV);

initMongoose();
