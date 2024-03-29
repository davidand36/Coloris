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
    εδ.errorHandler.setMessageElement( $("#errorMessageDiv") );
    εδ.storage.setPrefix( "Coloris_" );
    εδ.storage.get( "settings", processSettings );
    setupResizeHandler( );
    app.showScreen( "splashScreen", app.loader.getResourceLoadProgress );

    //-------------------------------------------------------------------------

    function setupResizeHandler( )
    {
        //.....................................................................

        function handleResize( )
        {
            var maxWidth = 800,
                maxHeight = 480,
                mobile = ($.os && ($.os.phone || $.os.tablet)),
                winWidth = window.innerWidth,
                winHeight = window.innerHeight,
                w, h,
                newDims;

            if ( mobile )
            { //fill screen with a margin for error
                w = winWidth - 4;
                h = winHeight - 4;
            }
            else
            {
                w = Math.min( winWidth - 4, maxWidth );
                h = Math.min( winHeight - 4, maxHeight );
            }
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

    //-------------------------------------------------------------------------

    function processSettings( storedSettings )
    {
        app.settings = storedSettings || app.settings || { };
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
