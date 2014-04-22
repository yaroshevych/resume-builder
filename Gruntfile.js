'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'

module.exports = function(grunt) {
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);
    // show elapsed time at the end
    require('time-grunt')(grunt);

    // configurable paths
    var yeomanConfig = {
        app: require('./bower.json').appPath || 'client',
        dist: 'dist'
    };

    grunt.initConfig({
        yeoman: yeomanConfig,
        watch: {
            // files: ['app/**/*'],
            // options: {
            //     livereload: true
            // },
            emberTemplates: {
                files: '<%= yeoman.app %>/templates/**/*.hbs',
                tasks: ['emberTemplates']
            },
            neuter: {
                files: ['<%= yeoman.app %>/scripts/{,*/}*.js','<%= yeoman.app %>/tests/{,*/}*.js'],
                tasks: ['neuter:app', 'neuter:test']
            },
            // coffee: {
            //     files: ['<%= yeoman.app %>/scripts/{,*/}*.coffee'],
            //     tasks: ['coffee']
            // },
            less: {
                files: ['<%= yeoman.app %>/styles/{,*/}*.less'],
                tasks: ['less']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            notify: {
                files: [
                    '<%= yeoman.app %>/templates/**/*.hbs',
                    '<%= yeoman.app %>/scripts/{,*/}*.js',
                    '<%= yeoman.app %>/styles/{,*/}*.less',
                    'Gruntfile.js'
                ],
                tasks: ['notify:watch']
            }
            // express: {
            //     files: ['app.js', '!**/node_modules/**', '!Gruntfile.js'],
            //     tasks: ['express:dev'],
            //     options: {
            //         nospawn: true // Without this option specified express won't be reloaded
            //     }
            // }
            // livereload: {
            //     options: {
            //         livereload: '<%= connect.options.livereload %>'
            //     },
            //     files: [
            //         '<%= yeoman.app %>/*.html',
            //         '{.tmp,<%= yeoman.app %>}/styles/{,*/}*.css',
            //         '{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js',
            //         '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
            //     ]
            // }
        },
        notify: {
            watch: {
                options: {
                    message: 'Client updated...'
                }
            },
            watchClient: {
                options: {
                    message: 'Started watching client...'
                }
            }
        },
        // connect: {
        //     options: {
        //         port: 9000,
        //         // change this to '0.0.0.0' to access the server from outside
        //         hostname: 'localhost',
        //         livereload: 35729
        //     },
        //     livereload: {
        //         options: {
        //             open: true,
        //             base: [
        //                 '.tmp',
        //                 '<%= yeoman.app %>'
        //             ]
        //         }
        //     },
        //     test: {
        //         options: {
        //             port: 9001,
        //             base: [
        //                 '.tmp',
        //                 'test',
        //                 '<%= yeoman.app %>'
        //             ]
        //         }
        //     },
        //     dist: {
        //         options: {
        //             base: '<%= yeoman.dist %>'
        //         }
        //     }
        // },
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= yeoman.dist %>/*',
                        '!<%= yeoman.dist %>/.git*',
                        '<%= yeoman.app %>/styles/main.css',
                        '<%= yeoman.app %>/styles/main.css.map'
                    ]
                }]
            },
            server: '.tmp'
        },
        // jshint: {
        //     options: {
        //         jshintrc: '.jshintrc',
        //         reporter: require('jshint-stylish')
        //     },
        //     all: [
        //         // 'Gruntfile.js',
        //         '<%= yeoman.app %>/scripts/{,*/}*.js',
        //         '!<%= yeoman.app %>/scripts/vendor/*',
        //         'test/spec/{,*/}*.js'
        //     ]
        // },
        // mocha: {
        //     all: {
        //         options: {
        //             run: true,
        //             urls: ['http://localhost:<%= connect.options.port %>/index.html']
        //         }
        //     }
        // },
        // coffee: {
        //     dist: {
        //         files: [{
        //             expand: true,
        //             cwd: '<%= yeoman.app %>/scripts',
        //             src: '{,*/}*.coffee',
        //             dest: '<%= yeoman.app %>/scripts',
        //             ext: '.js'
        //         }]
        //     }
        // },
        less: {
            dist: {
                files: {
                    '<%= yeoman.app %>/styles/main.css': ['<%= yeoman.app %>/styles/main.less']
                },
                options: {
                    sourceMap: true,
                    sourceMapFilename: '<%= yeoman.app %>/styles/main.css.map',
                    sourceMapBasepath: '<%= yeoman.app %>/',
                    sourceMapRootpath: '/'
                }
            }
        },
        // not used since Uglify task does concat,
        // but still available if needed
        /*concat: {
      dist: {}
    },*/
        // not enabled since usemin task does concat and uglify
        // check index.html to edit your build targets
        // enable this task if you prefer defining your build targets here
        /*uglify: {
      dist: {}
    },*/
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= yeoman.dist %>/scripts/{,*/}*.js',
                        '<%= yeoman.dist %>/styles/{,*/}*.css',
                        '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
                        '<%= yeoman.dist %>/fonts/{,*/}*.*'
                    ]
                }
            }
        },
        useminPrepare: {
            html: '<%= yeoman.app %>/index.html',
            options: {
                dest: '<%= yeoman.dist %>'
            }
        },
        usemin: {
            html: ['<%= yeoman.dist %>/{,*/}*.html'],
            css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
            options: {
                dirs: ['<%= yeoman.dist %>']
            }
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },
        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.svg',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },
        cssmin: {
            dist: {
                files: {
                    '<%= yeoman.dist %>/styles/main.css': [
                        '.tmp/styles/{,*/}*.css',
                        '<%= yeoman.app %>/styles/{,*/}*.css'
                    ]
                }
            }
        },
        htmlmin: {
            dist: {
                options: {
                    /*removeCommentsFromCDATA: true,
          // https://github.com/yeoman/grunt-usemin/issues/44
          //collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true*/
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>',
                    src: '*.html',
                    dest: '<%= yeoman.dist %>'
                }]
            }
        },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        'fonts/{,*/}*.*',
                        '.htaccess',
                        'images/{,*/}*.{webp,gif}'
                    ]
                }]
            },
            server: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>/bower_components/font-awesome/fonts/',
                    dest: '<%= yeoman.app %>/fonts/font-awesome',
                    src: ['*']
                }, {
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>/bower_components/bootstrap/fonts/',
                    dest: '<%= yeoman.app %>/fonts/glyphicons',
                    src: ['*']
                }]
            }
        },
        concurrent: {
            dist: [
                // 'coffee',
                'less',
                'imagemin',
                'svgmin',
                'htmlmin'
            ]
        },
        emberTemplates: {
            options: {
                templateName: function(sourceFile) {
                    var templatePath = yeomanConfig.app + '/templates/';
                    return sourceFile.replace(templatePath, '');
                }
            },
            app: {
                files: {
                    '.tmp/scripts/templates.js': '<%= yeoman.app %>/templates/{,*/}*.hbs'
                }
            }
        },
        neuter: {
            app: {
                options: {
                    filepathTransform: function(filepath) {
                        return yeomanConfig.app + '/' + filepath;
                    }
                },
                src: '<%= yeoman.app %>/scripts/app.js',
                dest: '.tmp/scripts/app.js'
            },
            test: {
                options: {
                    filepathTransform: function(filepath) {
                        return yeomanConfig.app + '/' + filepath;
                    }
                },
                src: '<%= yeoman.app %>/tests/tests.js',
                dest: '.tmp/tests/tests.js'
            }
        },
        // Express Config
        express: {
            options: {
                // Override defaults here
            },
            dev: {
                options: {
                    script: 'app.js'
                }
            }
        },
        testem: {
            basic: {
                src: [
                    'client/bower_components/jquery/dist/jquery.js',
                    'client/bower_components/handlebars/handlebars.runtime.js',
                    'client/bower_components/ember/ember.js',
                    'client/bower_components/ember-data/ember-data.js',
                    'client/bower_components/lodash/dist/lodash.js',

                    'client/bower_components/bootstrap/js/affix.js',
                    'client/bower_components/bootstrap/js/alert.js',
                    'client/bower_components/bootstrap/js/dropdown.js',
                    'client/bower_components/bootstrap/js/tooltip.js',
                    'client/bower_components/bootstrap/js/modal.js',
                    'client/bower_components/bootstrap/js/transition.js',
                    'client/bower_components/bootstrap/js/button.js',
                    'client/bower_components/bootstrap/js/popover.js',
                    'client/bower_components/bootstrap/js/carousel.js',
                    'client/bower_components/bootstrap/js/scrollspy.js',
                    'client/bower_components/bootstrap/js/collapse.js',
                    'client/bower_components/bootstrap/js/tab.js',

                    'client/bower_components/ladda/js/spin.js',
                    'client/bower_components/ladda/js/ladda.js',

                    'client/bower_components/moment/moment.js',

                    'client/bower_components/to-markdown/src/to-markdown.js',
                    'client/bower_components/markdown/lib/markdown.js',
                    'client/bower_components/bootstrap-markdown/js/bootstrap-markdown.js',
                    'client/bower_components/jquery-bootpag/lib/jquery.bootpag.js',

                    'client/bower_components/ember-qunit/dist/globals/main.js',

                    '.tmp/scripts/app.js',
                    '.tmp/scripts/templates.js',

                    '.tmp/tests/tests.js'
                ],
                options: {
                    parallel: 2,
                    framework: 'qunit',
                    launch_in_dev: ['PhantomJS'],
                    launch_in_ci: ['PhantomJS']
                }
            }
        }
    });

    grunt.registerTask('serve', function(target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            // 'coffee',
            'emberTemplates',
            'neuter:app',
            'less',
            'copy:server',
            // 'connect:livereload',
            'express:dev',
            'watch'
        ]);
    });

    // grunt.registerTask('server', function() {
    //     grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    //     grunt.task.run(['serve']);
    // });

    // grunt.registerTask('test', [
    //     'clean:server',
    //     // 'coffee',
    //     'less',
    //     'copy:server',
    //     'connect:test',
    //     'neuter:app'
    //     // 'mocha'
    // ]);
    grunt.registerTask('watchClient', [
        'clean:server',
        // 'coffee',
        'emberTemplates',
        'neuter:app',
        'neuter:test',
        'less',
        'copy:server',
        // 'connect:livereload',
        // 'express:dev',
        'notify:watchClient',
        'watch'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'copy:server',
        'useminPrepare',
        'concurrent',
        'emberTemplates',
        'cssmin',
        'neuter:app',
        'concat',
        'uglify',
        'copy',
        'rev',
        'usemin'
    ]);

    grunt.registerTask('default', [
        // 'jshint',
        // 'test',
        'build'
    ]);

    grunt.registerTask('test', [
        'clean:server',
        'emberTemplates',
        'neuter:app',
        'neuter:test',
        'copy:server',
        'testem:ci:basic'
    ]);
};
