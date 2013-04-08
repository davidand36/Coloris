/*
  MainMenu.js

  Main menu screen for the game.
*/

//*****************************************************************************


var app = app || { };
app.screens = app.screens || { };


//*****************************************************************************


app.screens[ "mainMenu" ] =
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
         
         function setInputHandler( )
         {
             $("#mainMenu menu").click(
                 function( event )
                 {
                     var target = $(event.target),
                         screenId;
                     if ( target.is( "button" ) === false )
                         return false;
                     screenId = target.attr( "name" );
                     app.showScreen( screenId );
                     return false;
                 }
             );
         }
         
    //-------------------------------------------------------------------------

         function clearInputHandler( )
         {
             $("#mainMenu menu").off( "click" );
         }

    //=========================================================================

         return {
             run: run,
             stop: stop
         };
         
    //-------------------------------------------------------------------------
     }
)();


//*****************************************************************************
