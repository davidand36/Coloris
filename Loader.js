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
             var firstScripts =
                 [
                     "εδ/ErrorHandler.js",
                     "εδ/Util.js",
                     "εδ/Math.js",
                     "εδ/Vector.js",
                     "εδ/Random.js",
                     "εδ/Timer.js",
                     "εδ/GameLoop.js",
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

             Modernizr.load(
                 [
                     {
                         test: navigator.appName.match( /Explorer/ ),
                         yep: "lib/jquery.min.js",
                         nope: "lib/zepto.min.js"
                     },
                     {
                         load: "lib/underscore-min.js"
                     },
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
