/*
  ColorisCanvasView.js

  Displays the Coloris game using the Canvas
*/

//*****************************************************************************


//*****************************************************************************


var app = app || { };
app.coloris = app.coloris || { };


//=============================================================================


app.coloris.view =
    (function()
     {
    //-------------------------------------------------------------------------

         var model,
             canvas, ctx,
             wellDims,    // measured cells
             wellRect,    // pixels
             wellOrigin,  // pos of cell (0,0) in pixels
             cellSize,
             scoreArea,
             gameOverArea,
             showGhostPiece,
             ghostAlpha = 0.25,
             clearData,
             score,
             level,
             gameOver;
         
    //=========================================================================

         function setup( colorisModel, params )
         {
             canvas = εδ.makeCanvas( 'canvasDiv' );
             ctx = canvas.getContext( '2d' );
             model = colorisModel;
             showGhostPiece = params.showGhostPiece;
             setupWell( );
             setupDisplayAreas( );
         }

    //-------------------------------------------------------------------------

         function setupWell( )
         {
             var w, h;
             wellDims = model.getVisibleWellDimensions( );
             cellSize = Math.min( (canvas.width * 0.9) / wellDims.width,
                                  (canvas.height * 0.9) / wellDims.height );
             cellSize = Math.round( cellSize );
             w = cellSize * wellDims.width;
             h = cellSize * wellDims.height;
             wellRect = { x: Math.round( (canvas.width - w) / 2 ),
                          y: Math.round( (canvas.height - h) / 2 ),
                          width: w,
                          height: h };
             wellOrigin = { x: wellRect.x,
                            y: wellRect.y + cellSize * (wellDims.height - 1) };
         }

    //-------------------------------------------------------------------------

         function setupDisplayAreas( )
         {
             scoreArea = { x: 10, y: 10,
                           width: wellRect.x - 20,
                           height: 90,
                           textSize: '20px',
                           lineHeight: 30 };
             gameOverArea = { x: wellRect.x + wellRect.width / 2,
                              y: wellRect.y + wellRect.height / 2,
                              textSize: '45px',
                              lineHeight: 60 };
         }

    //=========================================================================

         function cellLocToPos( loc )
         {
             //Loc has y increasing upward
             return { x: wellOrigin.x  +  loc.x * cellSize,
                      y: wellOrigin.y  -  loc.y * cellSize };
         }

    //-------------------------------------------------------------------------

         function drawCell( loc, colorIndex, alpha )
         {
             var emptyColor = "rgba( 0, 0, 0, 0.8 )",
                 colors = [
                     "hsl( 0, 100%, 50% )",
                     "hsl( 275, 100%, 50% )",
                     "hsl( 75, 100%, 50% )",
                     "hsl( 140, 100%, 40% )",
                     "hsl( 230, 100%, 60% )",
                     "hsl( 35, 100%, 60% )",
                     "hsl( 310, 100%, 50% )"
                 ],
                 color,
                 pos;
             if ( model.isLocVisible( loc ) === false )
                 return;
             if ( colorIndex < 0 )
                 color = emptyColor;
             else
                 color = colors[ colorIndex ];
             pos = cellLocToPos( loc );
             ctx.save( );
             ctx.fillStyle = color;
             if ( alpha )
             {
                 ctx.globalAlpha = alpha;
             }
             ctx.fillRect( pos.x, pos.y, cellSize, cellSize );
             ctx.restore( );
         }

    //=========================================================================

         function newGame( )
         {
             gameOver = false;
             score = { pieces: 0,
                       clears: 0 };
             setLevel( 0 );
         }

    //-------------------------------------------------------------------------

         function update( time )
         {
             updateClear( time );
             app.background.drawLevel( level );
             drawWellBackground( );
             drawWellCells( );
             drawActivePiece( );
             if ( clearData )
                 drawClearRegion( );
             if ( showGhostPiece )
                 drawGhostPiece( );
             showScore( );
             showGameOver( );
         }

    //-------------------------------------------------------------------------

         function drawWellBackground( )
         {
             drawWellBorder( );
             ctx.save( );
             ctx.fillStyle = "rgba( 0, 0, 0, 0.8 )";
             ctx.fillRect( wellRect.x, wellRect.y,
                           wellRect.width, wellRect.height );
             //!!!
             ctx.restore( );
         }

    //-------------------------------------------------------------------------

         function drawWellBorder( )
         {
             var borderColor = "rgb( 160, 197, 95 )",
                 x, y, w, h;
             ctx.save( );
             ctx.lineWidth = 1;
             ctx.strokeStyle = borderColor;
             x = wellRect.x - 1;
             y = wellRect.y - 1;
             w = wellRect.width + 2;
             h = wellRect.height + 2;
             ctx.strokeRect( x, y, w, h );
             x -= 3;
             y -= 3;
             w += 6;
             h += 6;
             ctx.strokeRect( x, y, w, h );
             ctx.restore( );
         }

    //-------------------------------------------------------------------------

         function drawWellCells( )
         {
             var x, y,
                 width = wellDims.width,
                 height = wellDims.height,
                 loc,
                 colorIndex;

             for ( x = 0; x < width; ++x )
             {
                 for ( y = 0; y < height; ++y )
                 {
                     loc = { x: x, y: y };
                     colorIndex = model.getCellVal( loc );
                     if ( colorIndex >= 0 )
                     {
                         drawCell( loc, colorIndex );
                     }
                 }
             }
         }

    //-------------------------------------------------------------------------

         function drawActivePiece( )
         {
             drawPiece( true );
         }

    //.........................................................................

         function drawGhostPiece( )
         {
             drawPiece( false );
         }

    //.........................................................................

         function drawPiece( active )
         {
             var piece =
                     active ? model.getActivePiece() : model.getGhostPiece(),
                 colorIndex,
                 i, lim,
                 loc;
             if ( piece === null )
                 return;
             colorIndex = piece.colorIndex;
             for ( i = 0, lim = piece.cells.length; i < lim; ++i )
             {
                 loc = piece.cells[ i ];
                 if ( active )
                     drawCell( loc, colorIndex );
                 else
                     drawCell( loc, colorIndex, ghostAlpha );
             }
         }

    //=========================================================================

         function startClear( data, startTime, duration )
         {
             if ( ! clearData )
                 return;
             clearData = data;
             clearData.startTime = startTime;
             clearData.duration = duration;
             clearData.fraction = 0;
         }

    //-------------------------------------------------------------------------

         function updateClear( time )
         {
             var elapsed;

             if ( ! clearData )
                 return;
             elapsed = time - clearData.startTime;
             clearData.fraction =
                 εδ.math.clampReal( elapsed / clearData.duration, 0, 1 );
         }

    //-------------------------------------------------------------------------

         function finishClear( )
         {
             clearData = null;
         }

    //-------------------------------------------------------------------------

         function drawClearRegion( )
         {
             var region,
             colorIndex,
             alpha,
             i, lim,
             loc;

             if ( ! clearData )
                 return;
             
             region = clearData.region;
             colorIndex = clearData.color;
             alpha = 1.0 - clearData.fraction;
             for ( i = 0, lim = region.length; i < lim; ++i )
             {
                 loc = region[ i ];
                 drawCell( loc, colorIndex, clearAlpha )
             }
         }

    //=========================================================================

         function setScore( newScore )
         {
             score = newScore;
         }

    //-------------------------------------------------------------------------

         function showScore( )
         {
             var x = scoreArea.x,
                 y = scoreArea.y;

             ctx.save( );

             ctx.fillStyle = 'rgba( 0, 0, 0, 0.7 )';
             ctx.fillRect( scoreArea.x, scoreArea.y,
                           scoreArea.width, scoreArea.height );

             ctx.font = scoreArea.textSize + ' Text';
             ctx.fillStyle = 'rgb( 160, 197, 95 )';
             ctx.textAlign = 'left';
             ctx.textBaseline = 'top';

             ctx.fillText( 'Level: ' + level, x, y );
             y += scoreArea.lineHeight;
             ctx.fillText( 'Pieces: ' + score.pieces, x, y );
             y += scoreArea.lineHeight;
             ctx.fillText( 'Clears: ' + score.clears, x, y );

             ctx.restore( );
         }

    //=========================================================================

         function setLevel( newLevel )
         {
             if ( newLevel !== level )
             {
                 level = newLevel;
                 app.background.loadLevel( level + 1 ); //stay one step ahead
             }
         }

    //=========================================================================

         function setGameOver( )
         {
             gameOver = true;
         }

    //-------------------------------------------------------------------------

         function showGameOver( )
         {
             var x = gameOverArea.x,
                 y = gameOverArea.y;

             if ( gameOver === false )
                 return;

             ctx.save( );

             ctx.font = gameOverArea.textSize + ' Text';
             ctx.fillStyle = 'rgb( 0, 0, 0 )';
             ctx.strokeStyle = 'rgb( 255, 255, 255 )';
             ctx.textAlign = 'center';
             ctx.textBaseline = 'alphabetic';

             ctx.fillText( 'GAME', x, y );
             ctx.strokeText( 'GAME', x, y );
             y += gameOverArea.lineHeight;
             ctx.fillText( 'OVER', x, y );
             ctx.strokeText( 'OVER', x, y );

             ctx.restore( );
         }

    //=========================================================================

         return {
             setup: setup,
             newGame: newGame,
             update: update,
             startClear: startClear,
             finishClear: finishClear,
             setScore: setScore,
             setLevel: setLevel,
             setGameOver: setGameOver
         };
         
    //-------------------------------------------------------------------------
     }
)();


//*****************************************************************************
