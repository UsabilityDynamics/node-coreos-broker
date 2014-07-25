/**
 * Cluster Build
 *
 * The path to the Vendor Repository Directory should be stored in the global "VENDOR_REPOSITORY_DIRECTORY" variables.
 *
 * @author potanin@UD
 * @version 0.0.2
 * @param grunt
 */
module.exports = function( grunt ) {

  grunt.initConfig({

    // Load Package Data.
    pkg: grunt.file.readJSON( 'package.json' ),

    // Run Mocha Tests.
    mochacli: {
      options: {
        require: [ 'should' ],
        reporter: 'list',
        ui: 'exports'
      },
      all: [ 'test/*.js' ]
    },

    // Generate Static YUI Documentation
    yuidoc: {
      compile: {
        name: '<%= pkg.name %>',
        description: '<%= pkg.description %>',
        version: '<%= pkg.version %>',
        url: '<%= pkg.homepage %>',
        logo: 'http://media.usabilitydynamics.com/logo.png',
        options: {
          paths: [
            "./lib",
            "./bin",
            "./node_modules/veneer-terminal",
            "./node_modules/veneer-cluster",
            "./node_modules/veneer-service"
          ],
          outdir: './static/codex'
        }
      }
    },

    // Generate JS Coverage Report.
    jscoverage: {
      options: {
        inputDirectory: 'lib',
        outputDirectory: './static/lib-cov',
        highlight: true
      }
    },

    // Watch Files and Trigger Tasks.
    watch: {
      options: {
        interval: 1000,
        debounceDelay: 500
      },
      tests: {
        files: [
          'gruntfile.js',
          'bin/*.js',
          'lib/*.js',
          'test/*.js'
        ],
        tasks: [ 'test' ]
      },
      mapping: {
        options: {
          blah: true
        },
        files: [
          'lib/tasks/mapping.js',
          'static/data/mapping/*.json'
        ],
        tasks: [ 'mapping' ]
      },
      documents: {
        files: [
          'lib/tasks/documents.js',
          'static/data/documents/*.json'
        ],
        tasks: [ 'mapping', 'documents' ]
      },
      documentation: {
        files: [ 'readme.md' ],
        tasks: [ 'markdown' ]
      },
      less: {
        files: [
          'static/public/styles/src/*.*'
        ],
        tasks: [ 'less:production' ]
      },
      js: {
        files: [
          'static/public/scripts/src/*.*'
        ],
        tasks: [ 'requirejs' ]
      }
    },

    // Generate Frontend LESS Files.
    less: {
      production: {
        options: {
          cleancss: true,
          relativeUrls: true
        },
        files: {
          'static/public/styles/app.css': [ 'static/public/styles/src/app.less' ],
          'static/public/styles/error.css': [ 'static/public/styles/src/error.less' ]
        }
      }
    },

    // Genreate Frontend JavaScript Assets.
    uglify: {
      production: {
        options: {
          preserveComments: false,
          wrap: false,
          mangle: {
            except: [ 'jQuery', 'Bootstrap' ]
          }
        },
        files: {
          'static/public/scripts/app.js': [
            'static/public/scripts/app.js'
          ]
        }
      }
    },

    // Genreate Frontned Require.js Assets.
    requirejs: {
      production: {
        options: {
          name: 'app',
          baseUrl: 'static/public/scripts',
          out: "static/public/scripts/app.js",
          paths: {
            "app": 'src/app',
            "knockout": '//ajax.aspnetcdn.com/ajax/knockout/knockout-2.2.1',
            "knockout.mapping": '//cdnjs.cloudflare.com/ajax/libs/knockout.mapping/2.4.1/knockout.mapping.min',
            "lodash": '//cdnjs.cloudflare.com/ajax/libs/lodash.js/2.2.1/lodash.min',
            "async": '//cdnjs.cloudflare.com/ajax/libs/async/0.2.7/async.min',
            "typekit": "//use.typekit.net/bjj2odd"
          }
        }
      }
    },

    // Genreate HTML Documents from Markdown Files.
    markdown: {
      all: {
        files: [ {
          expand: true,
          src: 'readme.md',
          dest: 'static/',
          ext: '.html'
        }
        ],
        options: {
          templateContext: {},
          markdownOptions: {
            gfm: true,
            codeLines: {
              before: '<span>',
              after: '</span>'
            }
          }
        }
      }
    },

    // Remove Dynamic/Cache Files.
    clean: {
      modules: [
        "node_modules/abstract",
        "node_modules/ghost",
        "node_modules/auto",
        "node_modules/object-*",
        "node_modules/veneer-*"
      ]
    },

    // Execute Shell Commands.
    shell: {
      install: {},
      update: {}
    },

    // Setup Symbolic Links.
    symlink: {
      apache: {
        files: [
          {
            expand: true,
            cwd: 'source',
            src: [
              'static/public/.htaccess',
              'static/public/favicon.ico',
              'static/public/scripts',
              'static/public/styles'
            ],
            dest: '~/public_html'
          },
          {
            expand: true,
            src: [
              'static/public/.htaccess',
              'static/public/favicon.ico',
            ],
            dest: '~/public_html'
          }
        ]
      }
    }

  });

  // Load NPM Tasks.
  grunt.loadNpmTasks( 'grunt-markdown' );
  grunt.loadNpmTasks( 'grunt-mocha-cli' );
  grunt.loadNpmTasks( 'grunt-jscoverage' );
  grunt.loadNpmTasks( 'grunt-requirejs' );
  grunt.loadNpmTasks( 'grunt-contrib-symlink' );
  grunt.loadNpmTasks( 'grunt-contrib-yuidoc' );
  grunt.loadNpmTasks( 'grunt-contrib-watch' );
  grunt.loadNpmTasks( 'grunt-contrib-less' );
  grunt.loadNpmTasks( 'grunt-contrib-clean' );
  grunt.loadNpmTasks( 'grunt-contrib-uglify' );
  grunt.loadNpmTasks( 'grunt-shell' );

  // Load Custom Tasks.
  grunt.loadTasks( 'lib/tasks' );

  // Build Assets
  grunt.registerTask( 'default', [ 'less:production', 'requirejs', 'markdown', 'yuidoc', 'mochacli' ] );

  // Install environment
  grunt.registerTask( 'install', [ 'shell:pull', 'shell:install', 'yuidoc'  ] );

  // Update Environment
  grunt.registerTask( 'update', [ 'shell:pull', 'shell:update', 'yuidoc'   ] );

  // Prepare distribution
  grunt.registerTask( 'dist', [ 'clean', 'yuidoc', 'markdown'  ] );

  // Update Documentation
  grunt.registerTask( 'doc', [ 'yuidoc', 'markdown' ] );

  // Run Tests
  grunt.registerTask( 'test', [ 'mochacli' ] );

  // Developer Mode
  grunt.registerTask( 'dev', [ 'watch' ] );

};