/*
  SettingsScreen.js

  Settings screen for the game.
*/

//*****************************************************************************


var app = app || { };
app.screens = app.screens || { };


//*****************************************************************************


app.screens[ "settingsScreen" ] =
    (function()
     {
    //-------------------------------------------------------------------------

         function run( )
         {
             app.background.drawMain( );
             setFormValues( );
             setInputHandlers( );
         }
         
    //=========================================================================

         function stop( )
         {
             clearInputHandlers( );
         }

    //=========================================================================

         function setFormValues( )
         {
             $("#enableSound").prop( "checked", app.settings.enableSound );
             $("#enableMusic").prop( "checked", app.settings.enableMusic );
         }
         
    //-------------------------------------------------------------------------

         function getFormValues( )
         {
             app.settings.enableSound = $("#enableSound").prop( "checked" );
             app.settings.enableMusic = $("#enableMusic").prop( "checked" );
         }
         
    //=========================================================================

         function setInputHandlers( )
         {
             $("button[name='saveSettings']").click(
                 function( event )
                 {
                     getFormValues( );
                     εδ.storage.set( "settings", app.settings );
                     app.showScreen( "mainMenu" );
                 }
             );
             
             $("button[name='cancelSettings']").click(
                 function( event )
                 {
                     app.showScreen( "mainMenu" );
                 }
             );
         }
         
    //-------------------------------------------------------------------------

         function clearInputHandlers( )
         {
             $("button[name='saveSettings']").off( "click" );
             $("button[name='cancelSettings']").off( "click" );
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
