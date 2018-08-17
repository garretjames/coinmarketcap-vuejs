module.exports = function (grunt) {
// TODO fix grunt css cleanup plugins
  grunt.initConfig({
    uncss: {
      dist: {
        files: [
          { src: '/home/garret/WebstormProjects/trailhead-vue-demo/src/components/CoinComponent.vue', dest: 'src/styles/tidy.css' }
        ]
      }
    },
    cssmin: {
      dist: {
        files: [
          { src: 'src/styles/tidy.css', dest: 'src/styles/tidy.css' }
        ]
      }
    }
  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-uncss');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // Default tasks.
  grunt.registerTask('default', ['uncss', 'cssmin']);

};
