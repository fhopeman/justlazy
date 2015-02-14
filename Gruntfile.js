module.exports = function(grunt) {

    var browsers = [{
        browserName: "firefox",
        version: "19",
        platform: "XP"
    }, {
        browserName: "chrome",
        platform: "XP"
    }, {
        browserName: "chrome",
        platform: "linux"
    }, {
        browserName: "internet explorer",
        platform: "WIN8",
        version: "10"
    }, {
        browserName: "internet explorer",
        platform: "XP",
        version: "8"
    }, {
        browserName: "internet explorer",
        platform: "VISTA",
        version: "9"
    }, {
        browserName: "opera",
        platform: "Windows 2008",
        version: "12"
    }];

    grunt.initConfig({
        jshint: {
            files:
                [
                "Gruntfile.js",
                "src/**/*.js",
                "spec/**/*.js"
                ]
        },
        jasmine : {
            src : "src/**/*.js",
            options : {
                specs : "spec/**/*.js"
            }
        },
        connect: {
            server: {
                options: {
                    base: "",
                    port: 9999
                }
            }
        },
        "saucelabs-jasmine": {
            all: {
                options: {
                    urls: ["http://127.0.0.1:9999/jasmine-standalone/SpecRunner.html"],
                    build: process.env.TRAVIS_JOB_ID,
                    browsers: browsers,
                    testname: "lazymaltbeer.js tests",
                    "max-duration": 60,
                    tags: ["master"]
                }
            }
        },
        watch: {}
    });

    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-jasmine");
    grunt.loadNpmTasks("grunt-saucelabs");
    grunt.loadNpmTasks("grunt-contrib-connect");
    grunt.loadNpmTasks("grunt-contrib-watch");

    grunt.registerTask("server", ["connect", "watch"]);
    grunt.registerTask("test-jshint", ["jshint"]);
    grunt.registerTask("test-jasmine", ["jasmine"]);
    grunt.registerTask("test-browsers", ["connect", "saucelabs-jasmine"]);
    grunt.registerTask("test-all", ["jshint", "jasmine", "connect", "saucelabs-jasmine"]);
    grunt.registerTask("travis-ci", ["test-all"]);

    grunt.registerTask("default", ["test-jshint", "test-jasmine"]);

};
