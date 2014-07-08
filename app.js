'use strict';

var useCluster = process.env.NODE_ENV === 'production',
    isWorker = true,
    winston = require('winston'),
    mongoose = require('mongoose'),
    initLogger = function() {
        // TODO: log rotation
        winston.add(winston.transports.File, { filename: 'logs/appw.log', level: 'debug' });
        require('winston-papertrail');

        winston.add(winston.transports.Papertrail, {
            host: 'logs.papertrailapp.com',
            port: 12345
        });
    },
    initExpress = function() {
        var express = require('express'),
            path = require('path'),
            app = express(),
            session = require('./middleware/session'),
            passport = session.init(app),
            port = 3000;

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

            winston.info('Adding latency to simulate real-life connection...');
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
            winston.debug('+ %s %s', req.method, req.url);

            req.on('end', function() {
                winston.debug('- %s %s', req.method, req.url);
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
        winston.info('Express started on port ' + port + ', environment: ' + process.env.NODE_ENV + ', process: ' + process.pid);

    },
    initMongoose = function() {
        var connectionString = 'mongodb://localhost/resume-builder';

        if (process.env.NODE_ENV !== 'production') {
            mongoose.set('debug', function(collectionName, method, query, doc, opt) {
                winston.debug('%s %s %s %s $s', collectionName, method, JSON.stringify(query), JSON.stringify(doc), opt);
            });
        }

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

if (useCluster) {
    var cluster = require('cluster'),
        numCPUs = require('os').cpus().length;

    if (cluster.isMaster) {
        for (var i = 0; i < numCPUs; i++) {
            cluster.fork();
        }

        cluster.on('death', function(worker) {
            console.log('Worker ' + worker.pid + ' died');
            cluster.fork();
        });

        isWorker = false;
    }
}

if (isWorker) {
    initLogger();
    initExpress();
    initMongoose();
}
