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
    setupResizeHandler( );
    app.showScreen( "splashScreen", app.loader.getResourceLoadProgress );

    //-------------------------------------------------------------------------

    function setupResizeHandler( )
    {
        var maxWidth = 800,
            maxHeight = 800;

        //.....................................................................

        function handleResize( )
        {
            var w = window.innerWidth,
                h = window.innerHeight,
                newDims;

            w = Math.min( w - 4, maxWidth );
            h = Math.min( h - 4, maxHeight );
            newDims = { width: w,
                        height: h
                      };
            $('#game').css( newDims );
            app.resize( newDims );
        }

        //.....................................................................

        $(window).on( 'resize', handleResize );
        $(window).on( 'orientationchange', handleResize );

        handleResize( );
    }
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

//-----------------------------------------------------------------------------

app.getActiveScreen = function( )
{
    var activeScreenDiv = $("#game .screen.active"),
        activeScreenId = $(activeScreenDiv).attr( "id" ),
        activeScreen = app.screens[ activeScreenId ];
    if ( activeScreenDiv.length > 0 )
        return activeScreen;
    else
        return null;
}

//=============================================================================

app.resize = function( newDims )
{
    var activeScreen = app.getActiveScreen();

    $('#canvasDiv canvas').remove( );
    app.background.resize( ); //recreates the canvas
    if ( activeScreen )
    {
        if ( activeScreen.resize )
        {
            activeScreen.resize( newDims );
        }
    }
}


//*****************************************************************************
