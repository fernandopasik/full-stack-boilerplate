/* jshint maxlen: 150, indent: 2, camelcase: false */
'use strict';

module.exports = function (grunt) {

  /**
   * Load all grunt modules
   */
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({

    /**
     * Express Server
     */
    express: {
      options: {
        script: 'server/init.js'
      },
      dev: {
        options: {
          node_env: 'development'
        }
      },
      test: {
        options: {
          node_env: 'test'
        }
      },
      prod: {
        options: {
          node_env: 'production'
        }
      }
    },

    /**
     * Watch files for changes and then do stuff
     */
    watch: {
      dev: {
        files: [
          'server/{,**/}*.js',
          'app/{,**/}*.js'
        ],
        options: {
          nospawn: true,
          livereload: true
        },
        tasks: [
          'shell:mocha',
          'express:dev'
        ]
      },
      test: {
        files: [
          'test/{,**/}*.js'
        ],
        tasks: [
          'shell:mocha'
        ]
      },
      templates: {
        files: [
          'server/{,**/}*.{jade,html}'
        ],
        options: {
          livereload: true
        }
      },
      compass: {
        files: ['app/{,**/}*.scss'],
        tasks: ['compass'],
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
        path: 'http://localhost:9000'
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

    compass: {
      dev: {
        options: {
          sassDir: 'app/styles',
          fontsDir: 'app/styles/fonts',
          cssDir: '.tmp/styles',
          imagesDir: 'app/images',
          javascriptsDir: 'app/scripts',
          relativeAssets: true,
          trace: true,
          outputStyle: 'expanded'
        }
      }
    }

  });

  grunt.registerTask('default', [
    'compass',
    'jshint',
    'shell:mocha',
    'express:dev',
    'open',
    'watch'
  ]);

};
