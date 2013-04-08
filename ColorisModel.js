/*
  ColorisModel.js

  Model of the Coloris game.
*/


//*****************************************************************************


var app = app || { };
app.coloris = app.coloris || { };


//=============================================================================


app.coloris.model =
    (function()
     {
    //-------------------------------------------------------------------------

         var well,
             activePiece,
             tetrominoes,
             randomizer,
             rotationOffsets,
             pieceQueue;

    //=========================================================================

         function newGame( params )
         {
             setWellDimensions( params );
             initWell( );
             setTetrominoes( params.rotationSystem );
             setRandomizer( params );
             setRules( params );
             primePieceQueue( params.pieceQueueLength || 1 );
         }

    //=========================================================================

         function setWellDimensions( params )
         {
             well = { };
             well.width = params.wellWidth || 10;
             well.height = params.wellHeight || 20;
             well.visibleHeight = well.height - (params.hiddenRows || 0);
         }

    //-------------------------------------------------------------------------

         function getVisibleWellDimensions( )
         {
             return { width: well.width,
                      height: well.visibleHeight
                    };
         }

    //-------------------------------------------------------------------------

         function isLocInWell( loc )
         {
             return ( (loc.x >= 0) && (loc.x < well.width) &&
                      (loc.y >= 0) && (loc.y < well.height) );
         }

    //-------------------------------------------------------------------------

         function isLocVisible( loc )
         {
             return ( (loc.x >= 0) && (loc.x < well.width) &&
                      (loc.y >= 0) && (loc.y < well.visibleHeight) );
         }

    //=========================================================================

         function makeCellArray( value )
         {
             var cells = [],
                 x, y,
                 col;
             for ( x = 0; x < well.width; ++x )
             {
                 col = [];
                 for ( y = 0; y < well.height; ++y )
                 {
                     col.push( value );
                 }
                 cells.push( col );
             }
             return cells;
         }

    //-------------------------------------------------------------------------

         function copyCellArray( srcCells )
         {
             var cells = [],
                 x, y,
                 col;

             srcCells = srcCells || well.cells;
             for ( x = 0; x < well.width; ++x )
             {
                 col = [];
                 for ( y = 0; y < well.height; ++y )
                 {
                     col.push( srcCells[ x ][ y ] );
                 }
                 cells.push( col );
             }
             return cells;
         }

    //-------------------------------------------------------------------------

         function initWell( )
         {
             well.cells = makeCellArray( -1 );
             activePiece = null;
         }

    //-------------------------------------------------------------------------

         function getCellVal( loc, cellArray )
         {
             if ( ! isLocInWell( loc ) )
                 return null;
             cellArray = cellArray || well.cells;
             return cellArray[ loc.x ][ loc.y ];
         }

    //.........................................................................

         function setCellVal( loc, val, cellArray )
         {
             if ( ! isLocInWell( loc ) )
                 return;
             cellArray = cellArray || well.cells;
             cellArray[ loc.x ][ loc.y ] = val;
         }

    //.........................................................................

         function setCellVals( region, val, cellArray )
         {
             for ( var i = 0, lim = region.length; i < lim; ++i )
             {
                 setCellVal( region[ i ], val, cellArray );
             }
         }

    //-------------------------------------------------------------------------

         function clearRegion( region, cellArray )
         {
             setCellVals( region, -1, cellArray );
         }

    //-------------------------------------------------------------------------

         function getRegionVals( region, cellArray )
         {
             return _.map( region,
                           function getVal( loc )
                           {
                               return { loc: loc,
                                        val: getCellVal( loc, cellArray )
                                      };
                           } );
         }

    //.........................................................................

         function setRegionVals( regionVals, cellArray )
         {
             _.each( regionVals,
                     function setVal( datum )
                     {
                         setCellVal( datum.loc, datum.val, cellArray );
                     } );
         }

    //-------------------------------------------------------------------------

         function offsetRegion( region, offset )
         {
             for ( var i = 0, lim = region.length; i < lim; ++i )
             {
                 region[ i ] = εδ.vector.add( region[ i ], offset );
             }
         }

    //.........................................................................

         function offsetRegionVals( regionVals, offset )
         {
             for ( var i = 0, lim = regionVals.length; i < lim; ++i )
             {
                 regionVals[ i ].loc =
                     εδ.vector.add( regionVals[ i ].loc, offset );
             }
         }

    //.........................................................................

         function makeOffsetRegion( srcRegion, offset )
         {
             return _.map( srcRegion,
                           function( loc )
                           {
                               return εδ.vector.add( loc, offset );
                           } );
         }

    //.........................................................................

         function makeOffsetRegionVals( srcRegionVals, offset )
         {
             return _.map( srcRegionVals,
                           function( datum )
                           {
                               return { loc: εδ.vector.add( datum.loc, offset ),
                                        val: datum.val };
                           } );
         }

    //-------------------------------------------------------------------------

         function checkForSpace( region, cellArray )
         {
             for ( var i = 0, lim = region.length; i < lim; ++i )
             {
                 var loc = region[ i ];
                 if ( (isLocInWell( loc ) === false) ||
                      (getCellVal( loc, cellArray ) >= 0) )
                     return false;
             }
             return true;
         }

    //-------------------------------------------------------------------------

         function computeMaxDrop( region, cellArray )
         {
             var wellCopy = copyCellArray( cellArray ),
                 i, lim = well.height,
                 offset,
                 droppedRegion;

             clearRegion( region, wellCopy );
             for ( i = 1; i < lim; ++i )
             {
                 offset = { x: 0, y: -i };
                 droppedRegion = makeOffsetRegion( region, offset );
                 if ( checkForSpace( droppedRegion, wellCopy ) === false )
                     return i - 1;
             }
             return lim - 1;
         }

    //-------------------------------------------------------------------------

         function moveRegion( region, offset, cellArray )
         {
             var regionVals = getRegionVals( region, cellArray );
             clearRegion( region, cellArray );
             offsetRegion( region, offset );
             offsetRegionVals( regionVals, offset );
             setRegionVals( regionVals, cellArray );
         }

    //=========================================================================

         function getSurroundingRegion( loc, oneColor, cellArray )
         {
             var test,
                 color;
             
             if ( oneColor )
             {
                 color = getCellVal( loc, cellArray );
                 test = function testColor( p )
                 {
                     return isLocInWell( p ) &&
                         (getCellVal( p, cellArray ) === color);
                 }
             }
             else
             {
                 test = function testOccupied( p )
                 {
                     return isLocInWell( p ) &&
                         (getCellVal( p, cellArray ) >= 0);
                 }
             }
             
             return floodList( loc, test );
         }

    //.........................................................................

         function floodList( loc, test )
         {
             var cellList = [],
                 stack = [],
                 visited = makeCellArray( false ),
                 p, w, e, n, s;

             if ( test( loc ) === false )
                 return null;
             stack.push( loc );

             do
             {
                 p = stack.pop( );
                 if ( test( p ) && (getCellVal( p, visited ) === false) )
                 {
                     w = { x: p.x, y: p.y }; //western boundary
                     do
                     {
                         --w.x;
                     } while ( test( w ) &&
                               (getCellVal( w, visited ) === false) );
                     e = { x: p.x, y: p.y }; //eastern boundary
                     do
                     {
                         ++e.x;
                     } while ( test( e ) &&
                               (getCellVal( e, visited ) === false) );
                     for ( p = { x: w.x + 1, y: w.y }; p.x < e.x; ++p.x )
                     {
                         cellList.push( { x: p.x, y: p.y } );
                         setCellVal( p, true, visited );
                         n = { x: p.x, y: p.y + 1 }; //north
                         if ( test( n ) &&
                              (getCellVal( n, visited ) === false) )
                         {
                             stack.push( n );
                         }
                         s = { x: p.x, y: p.y - 1 }; //south
                         if ( test( s ) &&
                              (getCellVal( s, visited ) === false) )
                         {
                             stack.push( s );
                         }
                     }
                 }
             } while ( stack.length > 0 );

             cellList.sort( function( cell1, cell2 )
                            {
                                if ( cell1.x < cell2.x )
                                    return -1;
                                if ( cell1.x > cell2.x )
                                    return 1;
                                return cell1.y - cell2.y;
                            } );
             return cellList;
         }

    //-------------------------------------------------------------------------

         function listRegions( oneColor, cellArray )
         {
             var regions = [],
                 visited = makeCellArray( false ),
                 x, y, width = well.width, height = well.height,
                 loc,
                 region;

             for ( y = 0; y < height; ++y )
             {
                 for ( x = 0; x < width; ++w )
                 {
                     loc = { x: x, y: y };
                     if ( (getCellVal( loc, visited ) === false) &&
                          (getCellVal( loc, cellArray ) >= 0) )
                     {
                         region =
                             getSurroundingRegion( loc, oneColor, cellArray );
                         regions.push( region );
                         setCellVals( region, true, visited );
                     }
                 }
             }
             return regions;
         }

    //.........................................................................

         function findRegion( test, oneColor, cellArray )
         {
             var visited = makeCellArray( false ),
                 x, y, width = well.width, height = well.height,
                 loc,
                 region;

             for ( y = 0; y < height; ++y )
             {
                 for ( x = 0; x < width; ++x )
                 {
                     loc = { x: x, y: y };
                     if ( (getCellVal( loc, visited ) === false) &&
                          (getCellVal( loc, cellArray ) >= 0) )
                     {
                         region =
                             getSurroundingRegion( loc, oneColor, cellArray );
                         if ( test( region ) )
                         {
                             return region;
                         }
                         setCellVals( region, true, visited );
                     }
                 }
             }
             return null;
         }

    //=========================================================================

         function setTetrominoes( name )
         {
             switch ( name )
             {
             default:
             case "original":
                 tetrominoes = app.coloris.originalTetrominoes;
                 break;
             case "srs":
                 tetrominoes = app.coloris.srsTetrominoes;
                 break;
             case "sega":
                 tetrominoes = app.coloris.segaTetrominoes;
                 break;
             case "nintendo":
                 tetrominoes = app.coloris.nintendoTetrominoes;
                 break;
             case "dtet":
                 tetrominoes = app.coloris.dtetTetrominoes;
                 break;
             }
         }

    //-------------------------------------------------------------------------

         function setRules( params )
         {
             switch ( params.rules.kick )
             {
             default:
             case "none":
                 rotationOffsets = [ { x: 0, y: 0 } ];
                 break;
             case "right left":
                 rotationOffsets = [ { x: 0, y: 0 },
                                     { x: 1, y: 0 }, { x: -1, y: 0 } ];
                 break;
             case "right left up":
                 rotationOffsets = [ { x: 0, y: 0 },
                                     { x: 1, y: 0 }, { x: -1, y: 0 },
                                     { x: 0, y: 1 } ];
                 break;
             }
         }

    //=========================================================================

         function setRandomizer( params )
         {
             randomizer = { rng: params.rng || εδ.shRandom,
                            algorithm: params.randomizerAlgorithm || "uniform",
                            colors: params.colors || [ 0, 1, 2, 3, 4, 5, 6 ],
                            shapeColorMatch: params.shapeColorMatch || true
                          };
         }

    //.........................................................................

         function setColors( colors )
         {
             randomizer.colors = colors;
         }

    //.........................................................................

         function generatePieceType( )
         {
             var c, numColors = randomizer.colors.length,
                 s, numShapes = tetrominoes.length,
                 i;

             switch ( randomizer.algorithm )
             {
             case "uniform":
                 {
                     c = randomizer.rng.integer( numColors );
                     c = randomizer.colors[ c ];
                     if ( randomizer.shapeColorMatch )
                         s = c;
                     else
                         s = randomizer.rng.integer( numShapes );
                     return { color: c, shape: s };
                 }
             case "bag":
                 if ( ! randomizer.bag )
                 {
                     randomizer.bag = [];
                     for ( i = 0; i < numColors; ++i )
                         randomizer.bag.push( i );
                     randomizer.index = randomizer.bag.length;
                 }
                 if ( randomizer.index >= randomizer.bag.length )
                 {
                     εδ.shuffleArray( randomizer.bag, randomizer.rng );
                     randomizer.index = 0;
                 }
                 c = randomizer.bag[ randomizer.index++ ];
                 c = randomizer.colors[ c ];
                 s = c; //assuming shapeColorMatch
                 return { color: c, shape: s };
             }
         }

    //-------------------------------------------------------------------------

         function primePieceQueue( length )
         {
             pieceQueue = [];
             while ( pieceQueue.length < length )
             {
                 pieceQueue.push( generatePieceType( ) );
             }
         }

    //-------------------------------------------------------------------------

         function spawn( )
         {
             var pieceType = pieceQueue.shift( ),
                 loc = { x: Math.floor( (well.width - 1) / 2 ),
                         y: well.height - 1 };

             if ( activePiece !== null )
                 return false;
             pieceQueue.push( generatePieceType( ) );
             activePiece =
                 makePiece( pieceType.shape, pieceType.color, 0, loc );
             if ( checkForSpace( activePiece.cells ) === false )
             {
                 return false;
             }
             return true;
         }

    //.........................................................................

         function makePiece( shapeIndex, colorIndex, rotation, center )
         {
             piece = { shapeIndex: shapeIndex,
                       colorIndex: colorIndex,
                       rotation: rotation,
                       center: center,
                       cells: computePieceCells( shapeIndex,
                                                 rotation, center )
                     };
             return piece;
         }

    //.........................................................................

         function computePieceCells( shapeIndex, rotation, center )
         {
             return makeOffsetRegion( tetrominoes[ shapeIndex ][ rotation ],
                                      center );
         }
         
    //-------------------------------------------------------------------------

         function getActivePiece( )
         {
             if ( activePiece === null )
             {
                 return null;
             }
             return { colorIndex: activePiece.colorIndex,
                      cells: activePiece.cells };
         }

    //.........................................................................

         function getGhostPiece( )
         {
             var maxDrop,
                 offset,
                 loc,
                 ghostPiece;
             if ( activePiece === null )
             {
                 return null;
             }
             maxDrop = computeMaxDrop( activePiece.cells );
             if ( maxDrop === 0 )
             {
                 return null;
             }
             offset = { x: 0, y: -maxDrop };
             loc = εδ.vector.add( activePiece.center, offset );
             ghostPiece = makePiece( activePiece.shapeIndex,
                                     activePiece.colorIndex,
                                     activePiece.rotation,
                                     loc );
             return { colorIndex: ghostPiece.colorIndex,
                      cells: ghostPiece.cells };
         }

    //=========================================================================

         function shift( direction )
         {
             var offset,
                 loc,
                 shiftedPiece;

             if ( activePiece === null )
                 return false;

             offset = (direction === "left")  ?
                 { x: -1, y: 0 }  :  { x: 1, y: 0 };
             loc = εδ.vector.add( activePiece.center, offset );
             shiftedPiece = makePiece( activePiece.shapeIndex,
                                       activePiece.colorIndex,
                                       activePiece.rotation,
                                       loc );
             if ( checkForSpace( shiftedPiece.cells ) )
             {
                 activePiece = shiftedPiece;
                 return true;
             }
             else
             {
                 return false;
             }
         }

    //-------------------------------------------------------------------------

         function rotate( direction )
         {
             var rotation,
                 offset,
                 loc,
                 rotatedPiece,
                 i, lim;

             if ( activePiece === null )
                 return false;

             rotation = activePiece.rotation  +
                 ((direction === "clockwise")  ?  1  :  -1);
             rotation = εδ.math.wrap( rotation, 0, 4 );

             for ( i = 0, lim = rotationOffsets.length; i < lim; ++i )
             {
                 offset = rotationOffsets[ i ];
                 loc = εδ.vector.add( activePiece.center, offset );
                 rotatedPiece = makePiece( activePiece.shapeIndex,
                                           activePiece.colorIndex,
                                           rotation, loc );
                 if ( checkForSpace( rotatedPiece.cells ) )
                 {
                     activePiece = rotatedPiece;
                     return true;
                 }
             }
             return false;
         }

    //-------------------------------------------------------------------------

         function drop( distance )
         {
             var maxDrop,
                 offset,
                 loc;

             if ( activePiece === null )
                 return false;

             distance = distance || 1;
             maxDrop = computeMaxDrop( activePiece.cells );
             if ( maxDrop === 0 )
             {
                 return false;
             }
             distance = Math.min( distance, maxDrop );
             offset = { x: 0, y: -distance };
             loc = εδ.vector.add( activePiece.center, offset );
             activePiece = makePiece( activePiece.shapeIndex,
                                      activePiece.colorIndex,
                                      activePiece.rotation,
                                      loc );
             return true;
         }

    //-------------------------------------------------------------------------

         function lock( )
         {
             if ( activePiece === null )
                 return false;
             setCellVals( activePiece.cells, activePiece.colorIndex );
             activePiece = null;
             return true;
         }

    //-------------------------------------------------------------------------

         function checkForClear( )
         {
             var clearRegion = findRegion(
                 function( region )
                 {
                     //region has been sorted by x
                     return (region[ 0 ].x === 0) &&
                         (region[ region.length - 1 ].x === well.width - 1);
                 },
                 true );
             if ( clearRegion )
             {
                 return { region: clearRegion,
                          color: getCellVal( clearRegion[ 0 ] ) };
             }
             else
             {
                 return null;
             }
         }

    //-------------------------------------------------------------------------

         function checkForCollapse( )
         {
             var collapseRegion,
                 maxDrop;
             collapseRegion = findRegion(
                 function( region )
                 {
                     maxDrop = computeMaxDrop( region );
                     return (maxDrop > 0);
                 } );
             if ( collapseRegion )
             {
                 return { region: collapseRegion,
                          maxDrop: maxDrop };
             }
             else
             {
                 return null;
             }
         }

    //-------------------------------------------------------------------------

         function dropRegion( region, distance )
         {
             moveRegion( region, { x: 0, y: -distance } );
         }

    //=========================================================================

         return {
             newGame: newGame,
             getVisibleWellDimensions: getVisibleWellDimensions,
             isLocVisible: isLocVisible,
             getCellVal: getCellVal,
             clearRegion: clearRegion,
             setColors: setColors,
             spawn: spawn,
             getActivePiece: getActivePiece,
             getGhostPiece: getGhostPiece,
             shift: shift,
             rotate: rotate,
             drop: drop,
             lock: lock,
             checkForClear: checkForClear,
             checkForCollapse: checkForCollapse,
             dropRegion: dropRegion
         };
         
    //-------------------------------------------------------------------------
     }
)();


//*****************************************************************************
