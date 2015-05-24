/**
 * Created by Tivie on 12-11-2014.
 */

module.exports = function (grunt) {

  // Project configuration.
  var config = {
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        sourceMap: true,
        banner: ';/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */'
      },
      dist: {
        src:  [
          'src/**/**.js'
        ],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        sourceMap: true,
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    jshint: {
      files: [
        'Gruntfile.js',
        'src/**/*.js',
        'test/**/*.js'
      ]
    },
    jscs: {
      options: {
        config: '.jscs.json'
      },
      files:  {
        src: [
          'Gruntfile.js',
          'src/**/*.js',
          'test/**/*.js'
        ]
      }
    },
    changelog: {
      options: {
        repository: 'http://github.com/showdownjs/ngShowdown',
        dest: 'CHANGELOG.md'
      }
    },
    simplemocha: {
      node: {
        src: 'test/node/**/*.js',
        options: {
          globals: ['should'],
          timeout: 3000,
          ignoreLeaks: false,
          reporter: 'spec'
        }
      },
      browser: {
        src: 'test/browser/**/*.js',
        options: {
          reporter: 'spec'
        }
      }
    }
  };

  grunt.initConfig(config);

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-conventional-changelog');

  grunt.registerTask('lint', ['jshint', 'jscs']);
  grunt.registerTask('test', ['lint', 'concat', 'simplemocha']);
  grunt.registerTask('test-without-building', ['simplemocha']);
  grunt.registerTask('build', ['lint', 'test', 'uglify']);

  // Default task(s).
  grunt.registerTask('default', []);
};
