/*
  Loader.js

  Manages loading of scripts and resources.
*/

//*****************************************************************************


//Our one global object:
var app = app || { };


//*****************************************************************************


app.loader =
    (function()
     {
    //-------------------------------------------------------------------------

         var numResourcesToLoad = 0,
             numResourcesLoaded = 0;
         
    //=========================================================================

         function run( )
         {
             var useZepto = ('__proto__' in {}),
                 zjLoad,
                 libsLoad;

             var firstScripts =
                 [
                     "εδ/ErrorHandler.js",
                     "εδ/Util.js",
                     "εδ/Math.js",
                     "εδ/Vector.js",
                     "εδ/Random.js",
                     "εδ/Timer.js",
                     "εδ/DisplayLoop.js",
                     "lib/keycode.js",
                     // "lib/phantom-limb.js", //testing only (emulate touch)
                     "εδ/Input.js",
                     "εδ/CanvasGraphics.js",
                     "εδ/Audio.js",
                     "εδ/Storage.js",
                     "App.js",
                     "Settings.js",
                     "BackgroundCanvas.js",
                     "SplashScreen.js"
                 ],
                 secondScripts =
                 [
                     "MainMenu.js",
                     "AboutScreen.js",
                     "CreditScreen.js",
                     "SettingsScreen.js",
                     "ColorisScreen.js",
                     "ColorisModel.js",
                     "ColorisCanvasView.js",
                     "Tetrominoes.js",
                     "ColorisAudio.js"
                 ],
                 secondLoad = secondScripts.concat( listResources( ) );

             setResourcePrefix( );
             
             numResourcesToLoad = secondLoad.length + 1; //+1 for 1st level bg
             numResourcesLoaded = 0;

             if ( navigator.onLine )
             {
                 zjLoad = //Zepto or jQuery, ideally from CDN
                     {
                         test: useZepto,
                         yep: '//cdnjs.cloudflare.com/ajax/libs/zepto/1.0/zepto.min.js',
                         nope: '//cdnjs.cloudflare.com/ajax/libs/jquery/1.9.1/jquery.min.js',
                         complete: function( )
                         {
                             if ( (! window.jQuery) && (! window.Zepto) )
                             {
                                 Modernizr.load( 
                                     {
                                         test: useZepto,
                                         yep: 'lib/zepto.min.js',
                                         nope: 'lib/jquery.min.js'
                                     } );
                             }
                         }
                     };
                 libsLoad = //Other libs available via CDN
                     {
                         load:
                         [
                             '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.4/underscore-min.js',
                         ],
                         complete: function( )
                         {
                             var toLoad = [];
                             if ( ! window._ )
                                 toLoad.push( 'lib/underscore-min.js' );
                             if ( toLoad.length > 0 )
                             {
                                 Modernizr.load(
                                     {
                                         load: toLoad
                                     } );
                             }
                         }
                     };
             }
             else //Offline; skip CDNs
             {
                 zjLoad =
                     {
                         test: useZepto,
                         yep: 'lib/zepto.min.js',
                         nope: 'lib/jquery.min.js'
                     };
                 libsLoad =
                     [
                         'lib/underscore-min.js'
                     ];
             }
             
             Modernizr.load(
                 [
                     zjLoad,
                     libsLoad,
                     {
                         load: firstScripts,
                         complete: function()
                         {
                             app.start( );
                         }
                     },
                     {
                         load: secondLoad,
                         callback: function( url, result, key )
                         {
                             ++numResourcesLoaded;
                         },
                         complete: function()
                         {
                             app.background.loadLevel(
                                 0,
                                 function( )
                                 {
                                     numResourcesLoaded = numResourcesToLoad = 0;
                                 } );
                         }
                     }
                 ]
             );
         }

    //=========================================================================

         function listResources( )
         {
             var resources = [],
                 i, lim;

             for ( i = 0, lim = resources.length; i < lim; ++i )
             {
                 resources[ i ] = "resource!" + resources[ i ];
             }
             return resources;
         }
         
    //=========================================================================

         function setResourcePrefix( )
         {
             yepnope.addPrefix(
                 "resource",
                 function( resourceObj )
                 {
                     resourceObj.noexec = true;
                     return resourceObj;
                 }
             );
         }
         
    //=========================================================================

         function getResourceLoadProgress( )
         {
             if ( numResourcesToLoad > 0 )
             {
                 return numResourcesLoaded / numResourcesToLoad;
             }
             else
             {
                 return 1;
             }
         }
         
    //=========================================================================

         return {
             run: run,
             getResourceLoadProgress: getResourceLoadProgress
         };
         
    //-------------------------------------------------------------------------
     }
)();


//*****************************************************************************


app.loader.run( );


//*****************************************************************************
