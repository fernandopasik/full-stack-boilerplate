/* jshint maxlen: 120, indent: 2 */
'use strict';

module.exports = function (grunt) {

  /**
   * Load all grunt modules
   */
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({

    /**
     * Nodemon for reloading the server files on every change
     */
    nodemon: {
      dev: {
        options: {
          file: 'server/init.js',
          watchedExtensions: ['js'],
          watchedFolders: ['server'],
          env: {
            NODE_ENV: 'development',
            PORT: 9000
          }
        }
      }
    },

    /**
     * Watch files for changes and then do stuff
     */
    watch: {
      test: {
        files: [
          'test/{,**/}*.js',
          'server/{,**/}*.js',
          'app/{,**/}*.js'
        ],
        tasks: ['shell:mocha'],
        options: {
          livereload: true
        }
      }
    },

    /**
     * Execute Mocha Tests
     */
    shell: {
      options: {
        stdout: true,
        stderr: true
      },
      mocha: {
        command: 'NODE_ENV=test ./node_modules/mocha/bin/mocha test/test.js -R spec -c'
      }
    },

    /**
     * Open Browser for web application
     */
    open: {
      dev: {
        path: 'http://localhost:<%= nodemon.dev.options.env.PORT %>'
      }
    },

    /**
     * JSHint
     * Uses dotfiles .jshintrc and .jshintignore
     */
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      allFiles: [
        'Gruntfile.js',
        'server/{,**/}*.js',
        'app/{,**/}*.js',
        'test/{,**/}*.js'
      ]
    },

    /**
     * Concurrent tasks for process that need keepalive
     */
    concurrent: {
      target: {
        tasks: ['nodemon', 'watch', 'open:dev'],
        options: {
          logConcurrentOutput: true
        }
      }
    }

  });

  grunt.registerTask('default', [
    'jshint',
    'shell:mocha',
    'concurrent'
  ]);

};
