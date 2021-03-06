var deepExtend = require('deep-extend');
var through = require('through2');
var gutil = require('gulp-util');
var fs = require('fs');

var getBases = function( config ){
  var bases = typeof config === 'string' ? [{path:config, mapping:/.*/}] : config;

  bases.forEach(function(base){
    if ( base.path ) {
      base.contents = JSON.parse(fs.readFileSync(base.path, 'utf-8'));
    }
  });
  return bases;
};

var decorateJSON = function( bases, json, file ){
  var output = {};

  bases.forEach(function(base){
    if ( (!base.mapping || base.mapping.test(file.path)) && base.contents ) {
      deepExtend(output, base.contents);
    }
  });
  deepExtend(output, json);

  return output;
};

module.exports = function( opts ){
  var inject = opts.inject;
  var bases = getBases(opts.bases || []);
  var ignoreOtherFormat = opts.ignoreOtherFormat || false;

  var injector = function(file, enc, cb){
    if (file.isNull()) return cb(null, file);
    if (file.isStream()) return cb(new PluginError('gulp-json-injector', 'Streaming not supported'));

    var next = function( data ){
      file.contents = new Buffer(JSON.stringify(data, null, 2));
      cb(null, file);
    };

    try {
      var json = JSON.parse(file.contents.toString());
      json = decorateJSON(bases, json, file);

      if ( inject ) inject(json, next, file); else next(json, next, file);
    } catch (e) {

      if ( ignoreOtherFormat ) cb(null, file); else console.log(e.stack);
    }
  };

  return through.obj(injector);

};

