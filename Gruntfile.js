module.exports = function(grunt) {

    grunt.initConfig({
        jshint: {
            files:
                [
                'Gruntfile.js',
                'src/**/*.js',
                'spec/**/*.js'
                ]
        },
        jasmine : {
            src : 'src/**/*.js',
            options : {
                specs : 'spec/**/*.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-jasmine');

    grunt.registerTask('test', ['jshint', 'jasmine']);
    grunt.registerTask('default', 'test');

};
