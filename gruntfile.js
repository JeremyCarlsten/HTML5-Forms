'use strict';
var
    LIVERELOAD_PORT = 35729,
    lrSnippet = require('connect-livereload')({ port: LIVERELOAD_PORT }),
    mountFolder = function( connect, dir ) {
        return connect.static(require('path').resolve(dir));
    };

module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uncss: {
            dist: {
                files: {
                    'dist/css/tidy.css': ['app/css/*.css']
                }
            }
        },
        watch: {
            livereload: {
                files: [
                    'app/**/*.html',
                    'app/**/*.css'
                ],
                options: {
                    livereload: LIVERELOAD_PORT
                }
            }
        },
        connect: {
            options: {
                port: 9000,
                hostname: '0.0.0.0'
            },
            livereload: {
                options: {
                    middleware: function( connect ) {
                        return [
                            lrSnippet,
                            mountFolder(connect, 'app/')
                        ];
                    }
                }
            }
        },
        open: {
            server: {
                url: 'http://localhost:<%= connect.options.port %>'
            }
        }
    });


    grunt.loadNpmTasks('grunt-uncss');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-open');

    grunt.registerTask('serve', function() {
        grunt.task.run([
            'connect:livereload',
            'open',
            'watch'
        ]);
    });

    grunt.registerTask('default', ['uncss']);
}
