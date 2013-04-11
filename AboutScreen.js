/*
  AboutScreen.js

  About screen for the game.
*/

//*****************************************************************************


var app = app || { };
app.screens = app.screens || { };


//*****************************************************************************


app.screens[ "aboutScreen" ] =
    (function()
     {
    //-------------------------------------------------------------------------

         function run( )
         {
             app.background.drawMain( );
             setInputHandler( );
         }
         
    //=========================================================================

         function stop( )
         {
             clearInputHandler( );
         }

    //=========================================================================

         function resize( )
         {
             app.background.drawMain( );
         }

    //=========================================================================
         
         function setInputHandler( )
         {
             $("#aboutScreen button").click(
                 function( event )
                 {
                     var target = $(event.target),
                         screenId;
                     screenId = target.attr( "name" );
                     app.showScreen( screenId );
                     return false;
                 }
             );
         }
         
    //-------------------------------------------------------------------------

         function clearInputHandler( )
         {
             $("#aboutScreen button").off( "click" );
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
