module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uncss: {
            dist: {
                files: {
                    'dist/css/tidy.css': ['app/css/*.css']
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-uncss');

    grunt.registerTask('default', ['uncss']);
}
