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
    pkg: grunt.file.readJSON( 'package.json' )

  });

  // Load Custom Tasks.
  grunt.loadTasks( 'lib/tasks' );

};