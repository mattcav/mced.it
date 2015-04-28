'use strict';

module.exports = function(grunt) {

  require('time-grunt')(grunt);

  // Project configuration.
  grunt.initConfig({
    config: {
      src: 'src',
      dist: 'dist'
    },

   sass_directory_import: {
      files: {
        src: ['<%= config.src %>/styles/{base,modules,layout,objects}/_all.sass']
      }
    },

    sass: {
      dist: {
        options: {
          outputStyle: 'nested'
        },
        files: {
          '<%= config.dist %>/assets/css/app.css': '<%= config.src %>/styles/app.sass'
        }
      }
    },

    cssmin: {
      minify: {
        expand: true,
        cwd: '<%= config.dist %>/assets/css/',
        src: ['*.css', '!*.min.css'],
        dest: '<%= config.dist %>/assets/css/',
        ext: '.min.css'
      }
    },


    autoprefixer: {
      single_file: {
        options: {
          browsers: ['last 2 version', 'ie 8', 'ie 7']
        },
        src: '<%= config.dist %>/assets/css/app.css',
        dest: '<%= config.dist %>/assets/css/app.css'
      },
    },

    concat: {
      app: {
        src: [
          '<%= config.src %>/js/app.js'
        ],
        dest: '<%= config.dist %>/assets/js/app.js'
      },
      head: {
        src: [
          '<%= config.src %>/js/modernizr.js'
        ],
        dest: '<%= config.dist %>/assets/js/head.js'
      }
    },

    uglify: {
      app: {
        src: '<%= config.dist %>/assets/js/app.js',
        dest: '<%= config.dist %>/assets/js/app.min.js'
      }
    },

    filerev: {
      dist: {
        src: [
          '<%= config.dist %>/assets/js/{,*/}*.js',
          '<%= config.dist %>/assets/css/{,*/}*.css',
          '<%= config.dist %>/assets/images/*.{jpg,jpeg,gif,png,webp,svg}'
        ]
      }
    },

    useminPrepare: {
      html: '<%= config.dist %>/index.html',
      options: {
        dest: '<%= config.dist %>',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },

    usemin: {
      html: ['<%= config.dist %>/{,*/}*.html'],
      css: ['<%= config.dist %>/assets/css/{,*/}*.css'],
      options: {
        assetsDirs: ['<%= config.dist %>','./assets/images']
      }
    },

    copy: {
      images: {
        expand: true,
        cwd: '<%= config.dist %>/',
        src: 'tmp/*',
        dest: '<%= config.dist %>/assets/images/',
        flatten: true,
        filter: 'isFile',
      },
    },


    watch: {
      assemble: {
        files: ['<%= config.src %>/{content,data,templates}/{layouts,pages,partials}/{,*/}*.{md,hbs,yml}'],
        tasks: ['assemble']
      },
      sass: {
        files: '<%= config.src %>/styles/{,*/}*.sass',
        tasks: ['sass', 'autoprefixer']
      },
      concat: {
      files: '<%= config.src %>/js/{,*/}*.js',
        tasks: ['concat']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= config.dist %>/{,*/}*.html',
          '<%= config.dist %>/assets/{,*/}*.css',
          '<%= config.dist %>/assets/{,*/}*.js',
          '<%= config.dist %>/assets/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    connect: {
      options: {
        port: 9000,
        livereload: 35726,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          open: false,
          base: [
            '<%= config.dist %>'
          ]
        }
      }
    },

    assemble: {
      pages: {
        options: {
          flatten: true,
          production: false,
          assets: '<%= config.dist %>/assets',
          layout: '<%= config.src %>/templates/layouts/default.hbs',
          data: '<%= config.src %>/data/*.{json,yml}',
          partials: '<%= config.src %>/templates/partials/*.hbs'
        },
        files: [
          {
            '<%= config.dist %>/': ['<%= config.src %>/templates/pages/*.hbs']
          },
        ]
      },
    },

    // Before generating any new files,
    // remove any previously-created files.
    clean: {
      generated: {
        src: ['<%= config.dist %>/**/*.{html,xml,css,js}']
      },
      images: {
        src: ['<%= config.dist %>/assets/images/*.{jpg,jpeg,gif,png,webp,svg}']
      },
      tmp: {
        src: ['<%= config.dist %>/tmp/*']
      },
    }

  });

  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-sass-directory-import');
  grunt.loadNpmTasks('grunt-filerev');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-contrib-copy');


  grunt.registerTask('serve', [
    'clean:generated',
    'assemble',
    'sass_directory_import',
    'connect:livereload',
    'watch'
  ]);

  grunt.registerTask('build', function(){
    grunt.config('assemble.pages.options.production', true);
    grunt.task.run([
      'clean:generated',
      'useminPrepare',
      'assemble',
      'sass_directory_import',
      'sass',
      'autoprefixer',
      'concat',
      'uglify',
      'cssmin',
      'filerev',
      'usemin'
    ]);
  });

  grunt.registerTask('default', [
    'build'
  ]);

};
