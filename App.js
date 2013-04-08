/*
  App.js

  Main functions for Coloris app
*/

//*****************************************************************************


var app = app || { };


//*****************************************************************************


app.screens = app.screens || { };
    
//=============================================================================

app.start = function( )
{
    εδ.storage.setPrefix( "Coloris_" );
    app.settings = εδ.storage.get( "settings" ) || app.settings || { };
    app.showScreen( "splashScreen", app.loader.getResourceLoadProgress );
};

//=============================================================================

app.showScreen = function( screenId )
{
    var oldScreenDiv = $("#game .screen.active"),
        oldScreenId = $(oldScreenDiv).attr( "id" ),
        oldScreen = app.screens[ oldScreenId ],
        newScreenDiv = $("#" + screenId),
        newScreen = app.screens[ screenId ],
        args = Array.prototype.slice.call( arguments, 1 );
    if ( oldScreenDiv.length > 0 )
    {
        oldScreenDiv.removeClass( "active" );
        oldScreen.stop( );
    }
    newScreenDiv.addClass( "active" );
    newScreen.run.apply( newScreen, args );
};


//*****************************************************************************
