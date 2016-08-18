var fs = require('../util/fs');
var logger = require('../util/logger')('genConfig');

/**
 * Copies a boilerplate config file to the current config file location.
 */
module.exports = {
  execute: function genConfig (config) {
    var promises = [];

    if (config.casper_scripts) {
      logger.log("Copying '" + config.casper_scripts_default + '/*.js' + "' to '" + config.casper_scripts + "'");

      promises.push(fs.copyGlob(config.casper_scripts_default + '/*.js', config.casper_scripts));
    } else {
      logger.error('ERROR: Can\'t generate a scripts directory. No \'casper_scripts\' path property was found in backstop.json.');
    }

    // Copies a boilerplate config file to the current config file location.
    promises.push(fs.copy(config.captureConfigFileNameDefault, config.backstopConfigFileName).then(function() {
      logger.log("Configuration file written at '" + config.backstopConfigFileName + "'");
    }, function(err) {
      throw err;
    }));

    return Promise.all(promises);
  }
};