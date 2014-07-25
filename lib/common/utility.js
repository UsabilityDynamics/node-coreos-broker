/**
 * Helper utility
 *
 * @example
 *
 *    // Select specific methods to load
 *    var my_tools = WebSocketMQ.utility( 'if', 'extend', 'flatten', 'unwatch', 'watch' );
 *
 * @author potanin@UD
 * @date 6/17/13
 */
function Utility() {
  return Object.keys( arguments ) ? require( 'lodash' ).pick.apply( null, [ Utility, Array.prototype.slice.call( arguments ) ] ) : Utility;
}

/**
 * Constructor properties.
 *
 */
Object.defineProperties( module.exports = Utility, {
  publicAddreses: {
    /**
     *
     * @returns {Array}
     */
    value: function getPublicAddresses() {
      var _interfaces = require( 'os' ).networkInterfaces();
      var _private = /(^127\.)|(^192\.168\.)|(^10\.)|(^172\.1[6-9]\.)|(^172\.2[0-9]\.)|(^172\.3[0-1]\.)|(^::1$)/;

      var _return = [];

      for( var _id in _interfaces ) {

        _interfaces[ _id ].forEach( function( ips ) {

          if( ips.family === 'IPv4' && !ips.internal ) {

            if( !_private.test( ips.address ) ) {
              _return.push( ips.address );
            }
          }

        });

      }

      return _return;

    },
    enumerable: true,
    writable: true,
    configurable: true
  },
  generateKey: {
    value: function generateKey( length ) {
      return require( 'generate-key' ).generateKey( length || 16 ).toLowerCase()
    },
    enumerable: true,
    configurable: true,
    writable: true
  },
  generate_hash: {
    /**
     * Generate Random Hash
     *
     * @param text
     * @returns {string}
     */
    value: function generate_hash( text ) {
      return ( require( 'node-uuid' ).v1 ).toLowerCase()
    },
    enumerable: true,
    writable: true,
    configurable: true
  },
  slugify: {
    value: function slugify( text ) {
      text = ( require( 'string' )( text || '' ).replaceAll( '/', '-' ).s ).toLowerCase()
      text = ( require( 'string' )( text || '' ).replaceAll( '+', '-' ).s ).toLowerCase()
      return text;
    },
    enumerable: true,
    writable: true,
    configurable: true
  },
  defaults: {
    value: require( 'lodash' ).defaults,
    enumerable: true,
    writable: true,
    configurable: true
  },
  findup: {
    value: require( 'findup-sync' ),
    enumerable: true,
    writable: true,
    configurable: true
  },
  first: {
    value: require( 'lodash' ).first,
    enumerable: true,
    writable: true,
    configurable: true
  },
  get_route_from_method: {
    /**
     * Convert Method name to REST Route
     *
     */
    value: function get_route_from_method( name ) {

      // Decamel.
      name = require( 'string' )( name ).underscore().s;
      name = require( 'string' )( name ).dasherize().s;

      name = name.replace( '.', '/' );

      // Method Verb: get
      name = name.replace( '/get-', '/' );
      name = name.replace( '/list-', '/' );

      // Method Verb: post
      name = name.replace( '/set-', '/' );
      name = name.replace( '/update-', '/' );
      name = name.replace( '/start-', '/' );
      name = name.replace( '/generate-', '/' );
      name = name.replace( '/process-', '/' );
      name = name.replace( '/create-', '/' );

      // Method Verb: delete
      name = name.replace( '/delete-', '/' );
      name = name.replace( '/remove-', '/' );

      return '/' + name;

    },
    enumerable: true,
    writable: true,
    configurable: true
  },
  get_method_from_url: {
    /**
     * Guess REST method from URL
     *
     */
    value: function get_method_from_url( url ) {
      //console.log( 'getting method', url );

      // what the hell
      if( 'string' !== typeof url ) {
        return 'GET';
      }

      if( url.match( /(.list|.get)/ ) ) {
        return 'GET';
      }

      if( url.match( /(.start|.process|.create|.generate|.update|.set)/ ) ) {
        return 'POST';
      }

      if( url.match( /(.delete|.remove)/ ) ) {
        return 'DELETE';
      }

      // No idea.
      return 'GET';

    },
    enumerable: true,
    writable: true,
    configurable: true
  },
  flatten: {
    value: require( 'lodash' ).flatten,
    enumerable: true,
    writable: true,
    configurable: true
  },
  find: {
    value: require( 'lodash' ).find,
    enumerable: true,
    writable: true,
    configurable: true
  },
  chain: {
    value: require( 'lodash' ).chain,
    enumerable: true,
    writable: true,
    configurable: true
  },
  reject: {
    value: require( 'lodash' ).reject,
    enumerable: true,
    writable: true,
    configurable: true
  },
  merge: {
    value: function merge( a, b ) {
      if( a && b ) {
        for( var key in b ) {
          a[key] = b[key];
        }
      }
      return a;
    },
    enumerable: true,
    writable: true,
    configurable: true
  },
  parse_url: {
    value: require( 'url' ).parse,
    enumerable: true,
    writable: true,
    configurable: true
  },
  extend: {
    /**
     * Deep Extend.
     *
     * @returns {*}
     */
    value: function extend() {
      arguments[0] = arguments[0] || {};
      return require( 'lodash' ).extend.apply( null, arguments );
    },
    enumerable: false,
    writable: true,
    configurable: true
  },
  pluck: {
    value: require( 'lodash' ).pluck,
    enumerable: true,
    configurable: true,
    writable: true
  }
});