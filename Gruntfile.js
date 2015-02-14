module.exports = function (grunt) {

    var browsers = [
        // chrome
        {
            browserName: "chrome",
            platform: "Windows XP",
            version: "26.0"
        }, {
            browserName: "chrome",
            platform: "OS X 10.9",
            version: "38.0"
        }, {
            browserName: "chrome",
            platform: "Windows 8.1",
            version: "40.0"
        }, {
            browserName: "chrome",
            platform: "Linux",
            version: "30.0"
        },
        // firefox
        {
            browserName: "firefox",
            platform: "Windows XP",
            version: "10.0"
        }, {
            browserName: "firefox",
            platform: "Windows 7",
            version: "17.0"
        }, {
            browserName: "firefox",
            platform: "Linux",
            version: "35.0"
        },
        // internet explorer
        {
            browserName: "internet explorer",
            platform: "Windows XP",
            version: "8.0"
        }, {
            browserName: "internet explorer",
            platform: "Windows 7",
            version: "9.0"
        }, {
            browserName: "internet explorer",
            platform: "Windows 8",
            version: "10.0"
        }, {
            browserName: "internet explorer",
            platform: "Windows 8.1",
            version: "11.0"
        },
        // opera
        {
            browserName: "opera",
            platform: "Windows 7",
            version: "11"
        }, {
            browserName: "opera",
            platform: "Linux",
            version: "12"
        // safari
        }, {
            browserName: "safari",
            platform: "Windows 7",
            version: "5.1"
        }, {
            browserName: "safari",
            platform: "OS X 10.8",
            version: "6.0"
        },
        // iPhone, iPad
        {
            browserName: "iphone",
            platform: "OS X 10.10",
            deviceName: "iPhone Simulator",
            version: "6.1"
        }, {
            browserName: "iphone",
            platform: "OS X 10.10",
            deviceName: "iPad Simulator",
            version: "6.0"
        }, {
            browserName: "iphone",
            platform: "OS X 10.10",
            deviceName: "iPad Simulator",
            version: "7.0"
        }, {
            browserName: "iphone",
            platform: "OS X 10.10",
            deviceName: "iPad Simulator",
            version: "8.1"
        },
        // android
        {
            browserName: "android",
            platform: "Linux",
            deviceName: "Samsung Galaxy S2 Emulator",
            version: "4.2"
        }, {
            browserName: "android",
            platform: "Linux",
            deviceName: "Motorola Droid Razr Emulator",
            version: "4.0"
        }, {
            browserName: "android",
            platform: "Linux",
            deviceName: "Samsung Galaxy S3 Emulator",
            version: "4.1"
        }];

    grunt.initConfig({
        jshint: {
            files: [
                "Gruntfile.js",
                "src/**/*.js",
                "spec/**/*.js"
            ]
        },
        jasmine: {
            src: "src/**/*.js",
            options: {
                vendor: [
                    "jasmine-standalone/lib/jasmine-jquery-2.0.7/jquery.js",
                    "jasmine-standalone/lib/jasmine-jquery-2.0.7/jasmine-jquery.js",
                    "jasmine-standalone/phantomjs-config.js"
                ],
                specs: "spec/**/*.js"
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
                    "max-duration": 180,
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
