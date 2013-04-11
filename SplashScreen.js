/*
  SplashScreen.js

  Splash screen for the game.
  Displays a load-progress indicator, then proceeds to main menu.
  Timers are used to prevent this from flashing by too fast.
*/

//*****************************************************************************


var app = app || { };
app.screens = app.screens || { };


//*****************************************************************************


app.screens[ "splashScreen" ] =
    (function()
     {
    //-------------------------------------------------------------------------

         var getProgressFn,
             minScreenTime = 2500, //Minimum time on this screen (millisec)
             splashDone, progressDone;
         
    //=========================================================================

         function run( getProgress )
         {
             splashDone = false;
             progressDone = false;
             app.background.drawMain( );
             setTimeout( setSplashDone, minScreenTime );
             getProgressFn = getProgress;
             showProgress( );
         }

    //=========================================================================

         function stop( )
         {
             //Nothing to do
         }

    //=========================================================================

         function resize( )
         {
             app.background.drawMain( );
         }

    //=========================================================================

         function setSplashDone( )
         {
             splashDone = true;
             if ( progressDone )
             {
                 app.showScreen( "mainMenu" );
             }
         }

    //=========================================================================

         function showProgress( )
         {
             var progress  = $("#splashScreen .progress" ),
                 progressIndicator = $("#splashScreen .progress .indicator"),
                 pct = 100 * getProgressFn( );
             if ( pct < 100 )
             {
                 progress.show( );
                 progressIndicator.width( pct + "%" );
                 setTimeout( showProgress, 30 );
             }
             else
             {
                 progressIndicator.width( "100%" );
                 setTimeout( hideProgress, 100 );
             }
         }

    //-------------------------------------------------------------------------

         function hideProgress( )
         {
             var progress  = $("#splashScreen .progress" );
             progress.hide( );
             progressDone = true;
             if ( splashDone )
             {
                 app.showScreen( "mainMenu" );
             }
         }

    //=========================================================================

         return {
             run: run,
             stop: stop,
             resize: resize
         };
         
    //-------------------------------------------------------------------------
     }
)();


//*****************************************************************************
         
