var transformTools = require( 'browserify-transform-tools' );
var dotCompiler = require( './dot-compiler' );

var options = {
  includeExtensions: [
    '.dot',
    '.tpl',
    '.jst'
  ]
};

var transformExclude = require( 'browserify-transform-tools-exclude' );
var fnTransform = transformExclude( function ( content, transformOptions, done ) {
  try {
    var file = transformOptions.file;
    var path = require( 'path' );
    var dash2Camel = require( 'dash-2-camel' );

    file = path.basename( file ).replace( /\.\w+$/, '' );

    var name = dash2Camel( file );
    content = dotCompiler.compile( content, name );

    done( null, content );
  } catch (ex) {
    done( ex );
  }
} );

module.exports = transformTools.makeStringTransform( 'dot-ify', options, fnTransform );
