/*
  ColorisScreen.js

  Screen module for Coloris game
*/

//*****************************************************************************


var app = app || { };
app.screens = app.screens || { };


//*****************************************************************************


app.screens[ "colorisScreen" ] =
    (function()
     {
    //-------------------------------------------------------------------------

         var model,
             view,
             gameTime,
             audio,
             rules,
             keyMap,
             inputQueue,
             scheduledActions,
             levels,
             level,
             collapseData,
             score,
             gameOverDelay = 5.0;

    //=========================================================================

         function run( )
         {
             model = app.coloris.model;
             view = app.coloris.view;
             gameTime = εδ.timer( );
             audio = app.coloris.audio;
             rules = app.settings.rules;
             keyMap = app.settings.keyMap;
             startGame( true );
             if ( app.settings.enableMusic )
             {
                 audio.play( 'game_music' );
             }
             setEventHandlers( );
             εδ.gameLoop.setLoopFunction( update );
         }
         
    //=========================================================================

         function stop( )
         {
             clearEventHandlers( );
             εδ.gameLoop.setLoopFunction( null );
             εδ.audio.stopAll( );
         }

    //=========================================================================

         function startGame( init )
         {
             var modelParams =
                     {
                         wellWidth: rules.wellWidth,
                         wellHeight: rules.wellHeight,
                         hiddenRows: rules.hiddenRows,
                         rotationSystem: rules.rotationSystem,
                         randomizerAlgorithm: rules.randomizerAlgorithm,
                         shapeColorMatch: rules.shapeColorMatch,
                         rules: { kick: rules.kick }
                     },
                 viewParams =
                     {
                         showGhostPiece: rules.showGhostPiece
                     };

             if ( init )
             {
                 setupLevels( );
             }
             modelParams.colors = levels[ 0 ].colors;

             model.newGame( modelParams );

             if ( init )
             {
                 app.background.drawMain( );
                 view.setup( model, viewParams );
             }
             view.newGame( );
             level = 0;
             score = { pieces: 0,
                       clears: 0 };
             scheduledActions = {};
             startSpawn( );
         }

    //=========================================================================

         function setEventHandlers( )
         {
             $('#colorisScreen button[name="mainMenu"]').click(
                 function( event )
                 {
                     var target = $(event.target),
                         screenId = target.attr( 'name' );
                     app.showScreen( screenId );
                 }
             );

             $(document).keydown( handleKeyEvent );
             $(document).keyup( handleKeyEvent );

             inputQueue = [];
         }

    //-------------------------------------------------------------------------

         function clearEventHandlers( )
         {
             $(document).off( 'keydown keyup' );
         }

    //-------------------------------------------------------------------------

         function handleKeyEvent( event )
         {
             var evt = εδ.input.translateKeyEvent( event ),
                 action = keyMap[ evt.name ],
                 status = (event.type === 'keydown')  ?  'start'  :  'stop';
             if ( action )
             {
                 inputQueue.push( { action: action, status: status } );
             }
             return false;
         }

    //=========================================================================

         function setupLevels( )
         {
             var i, numLevels = rules.numLevels,
                 allColors = rules.levelColors.colorOrder,
                 numColors,
                 minColors = rules.levelColors.min,
                 maxColors = rules.levelColors.colorOrder.length,
                 a, b;

             levels = [];
             for ( i = 0; i < numLevels; ++i )
             {
                 levels.push( {} );
             }
             for ( i = 0; i < numLevels; ++i )
             {
                 if ( rules.levelUp.basedOn === 'clears' )
                 {
                     levels[ i ].clears = (i + 1) * rules.levelUp.number;
                 }
                 if ( rules.levelUp.basedOn === 'piecess' )
                 {
                     levels[ i ].pieces = (i + 1) * rules.levelUp.number;
                 }
             }
             for ( i = 0; i < numLevels; ++i )
             {
                 numColors = minColors + i / rules.levelColors.levelsPerStep;
                 numColors = Math.min( Math.floor( numColors ), maxColors );
                 levels[ i ].colors = allColors.slice( 0, numColors );
             }
             if ( rules.levelGravity.curve === 'linear time' )
             {
                 b = rules.levelGravity.min;
                 a = (rules.levelGravity.max - b) / (numLevels - 1);
                 for ( i = 0; i < numLevels; ++i )
                 {
                     levels[ i ].gravity = a * i  +  b;
                 }
             }
             else if ( rules.levelGravity.curve === 'linear speed' )
             {
                 b = 1.0 / rules.levelGravity.min;
                 a = ((1.0 / rules.levelGravity.max) - b) / (numLevels - 1);
                 for ( i = 0; i < numLevels; ++i )
                 {
                     levels[ i ].gravity = 1.0 / (a * i  +  b);
                 }
             }
         }

    //=========================================================================

         function update( )
         {
             var now = gameTime.getSeconds();

             processInputQueue( );
             updateScheduledActions( );

             view.update( now );

             timeLoop( now ); //development only
         }

    //-------------------------------------------------------------------------

         function timeLoop( updateStarted )
         {
             var now = gameTime.getSeconds(),
                 updateTime = now - updateStarted,
                 data,
                 secPer100, fps;
             if ( ! timeLoop.data )
             {
                 timeLoop.data = { minTime: 100,
                                   maxTime: 0,
                                   totalTime: 0,
                                   updateCount: 0,
                                   last100Time: updateStarted
                                 };
             }
             data = timeLoop.data;
             if ( updateTime > 0 )
                 data.minTime = Math.min( updateTime, data.minTime );
             data.maxTime = Math.max( updateTime, data.maxTime );
             data.totalTime += updateTime;
             ++data.updateCount;
             if ( data.updateCount % 100 === 0 )
             {
                 secPer100 = updateStarted - data.last100Time;
                 data.last100Time = updateStarted;
                 fps = 100 / secPer100;

                 console.log( 'Avg update=' +
                              (data.totalTime / data.updateCount) +
                              '  min=' + data.minTime + '  max=' + data.maxTime,
                              '  fps=' + fps );
             }
         }

    //-------------------------------------------------------------------------

         function processInputQueue( )
         {
             var input = inputQueue.shift( );

             while ( input )
             {
                 if ( input.status === 'start' )
                 {
                     doAction( input.action );
                     setupInputRepeat( input.action );
                     //!!! drop
                 }
                 else
                 {
                     clearScheduledAction( input.action );
                 }
                 input = inputQueue.shift( );
             }
         }

    //.........................................................................

         function setupInputRepeat( action )
         {
             var delay, repeatDelay;
             switch ( action )
             {
             case 'shift left':
             case 'shift right':
                 if ( rules.delayedAutoShift &&
                      (model.getActivePiece() || rules.dasPreload) )
                 {
                     delay = rules.delayedAutoShift.delay;
                     repeatDelay = rules.delayedAutoShift.repeat;
                     scheduleAction( action, delay, repeatDelay );
                 }
             }
         }

    //=========================================================================

         function startSpawn( )
         {
             if ( rules.spawnDelay )
             {
                 scheduleAction( 'spawn', rules.spawnDelay );
             }
             else
             {
                 doAction( 'spawn' );
             }
         }

    //=========================================================================

         function startGravity( )
         {
             var delay = levels[ level ].gravity;
             scheduleAction( 'gravity', delay, delay );
         }

    //=========================================================================

         function scheduleAction( action, delay, repeatDelay )
         {
             scheduledActions[ action ] = {
                 nextTime: gameTime.getSeconds() + delay,
                 repeatDelay: repeatDelay
             };
         }

    //-------------------------------------------------------------------------

         function clearScheduledAction( action )
         {
             delete scheduledActions[ action ];
         }

    //-------------------------------------------------------------------------

         function clearScheduledActions( action )
         {
             scheduledActions = {};
         }

    //-------------------------------------------------------------------------

         function isActionScheduled( action )
         {
             return !! scheduledActions[ action ];
         }

    //-------------------------------------------------------------------------

         function updateScheduledActions( )
         {
             var now = gameTime.getSeconds();
             _.each( scheduledActions,
                     function( sched, action )
                     {
                         if ( sched.nextTime <= now )
                         {
                             doAction( action );
                             if ( sched.repeatDelay )
                             {
                                 sched.nextTime = now + sched.repeatDelay;
                             }
                             else
                             {
                                 delete scheduledActions[ action ];
                             }
                         }
                     } );
         }

    //=========================================================================

         function doAction( action )
         {
//             console.log( 'Action: ' + action );
             switch ( action )
             {
             case 'spawn':
                 if ( model.spawn( ) )
                 {
                     startGravity( );
                     audio.play( 'spawn' );
                 }
                 else
                 {
                     doGameOver( );
                 }
                 break;
             case 'gravity':
                 doDrop( 'gravity' );
                 break;
             case 'drop':
                 doDrop( 'drop' );
                 break;
             case 'shift left':
                 doMove( 'shift', 'left' );
                 break;
             case 'shift right':
                 doMove( 'shift', 'right' );
                 break;
             case 'rotate clockwise':
                 doMove( 'rotate', 'clockwise' );
                 break;
             case 'rotate counter-clockwise':
                 doMove( 'rotate', 'counter-clockwise' );
                 break;
             case 'lock':
                 doLock( );
                 break;
             case 'finish clear':
                 finishClear( );
                 break;
             case 'update collapse':
                 updateCollapse( );
                 break;
             case 'new game':
                 startGame( );
                 break;
             }
         }

    //-------------------------------------------------------------------------

         function doDrop( type )
         {
             var lockDelay;

             if ( model.drop( 1 ) )
             {
                 audio.play( type );
             }
             else
             {
                 clearScheduledAction( 'gravity' );
                 clearScheduledAction( 'drop' );
                 lockDelay = ( (type === 'gravity') || rules.lockDelayOnDrop)  ?
                     rules.lockDelay  :  null;
                 if ( lockDelay )
                 {
                     scheduleAction( 'lock', lockDelay );
                 }
                 else
                 {
                     doAction( 'lock' );
                 }
             }
         }

    //-------------------------------------------------------------------------

         function doMove( move, direction )
         {
             var rslt;
             if ( move === 'shift' )
                 rslt = model.shift( direction );
             else
                 rslt = model.rotate( direction );
             if ( rslt )
             {
                 audio.play( move );
                 if ( isActionScheduled( 'lock' ) &&
                      rules.resetLockDelayOnMove )
                 {
                     clearScheduledAction( 'lock' );
                     startGravity( );
                 }
             }
             else
             {
                 audio.play( 'failed_' + move );
             }
         }

    //-------------------------------------------------------------------------

         function doLock( )
         {
             if ( model.drop( ) )
             {
                 startGravity( );
             }
             else
             {
                 model.lock( );
                 audio.play( 'lock' );
                 scorePiece( );
                 checkForClear( );
             }
         }

    //-------------------------------------------------------------------------

         function checkForClear( )
         {
             var clearData = model.checkForClear( );
             if ( clearData )
             {
                 scoreClear( );
                 doClear( clearData );
             }
             else
             {
                 startSpawn( );
             }
         }

    //-------------------------------------------------------------------------

         function doClear( clearData )
         {
             var clearDelay = rules.clearDelay;
             model.clearRegion( clearData.region );
             view.startClear( clearData,
                              gameTime.getSeconds(), clearDelay );
             audio.play( 'clear' );
             scheduleAction( 'finish clear', clearDelay );
         }
         
    //-------------------------------------------------------------------------

         function finishClear( )
         {
             view.finishClear( );
             checkForCollapse( );
         }

    //-------------------------------------------------------------------------

         function checkForCollapse( )
         {
             var delay = rules.collapseDelay;
             collapseData = model.checkForCollapse( );
             if ( collapseData )
             {
                 collapseData.dropped = 0;
                 scheduleAction( 'update collapse', delay, delay );
             }
             else
             {
                 checkForClear( );
             }
         }

    //-------------------------------------------------------------------------

         function updateCollapse(  )
         {
             if ( collapseData.dropped < collapseData.maxDrop )
             {
                 ++collapseData.dropped;
                 model.dropRegion( collapseData.region, 1 );
             }
             else
             {
                 audio.play( 'collapse' );
                 clearScheduledAction( 'update collapse' );
                 checkForCollapse( );
             }
         }

    //=========================================================================

         function scorePiece( )
         {
             ++score.pieces;
             updateScore( );
         }

    //-------------------------------------------------------------------------

         function scoreClear( )
         {
             ++score.clears;
             updateScore( );
         }

    //-------------------------------------------------------------------------

         function updateScore( )
         {
             checkLevelUp( );
             view.setScore( score );
         }

    //-------------------------------------------------------------------------

         function checkLevelUp( )
         {
             var curLevel = level,
                 levelData = levels[ level ];
             
             if ( (levelData.clears &&
                   (levelData.clears <= score.clears)) ||
                  (levelData.pieces &&
                   (levelData.pieces <= score.pieces)) )
             {
                 level = εδ.math.clampInt( ++level, 0, levels.length );
                 if ( level != curLevel )
                 {
                     audio.play( 'level_up' );
                     levelData = levels[ level ];
                     model.setColors( levelData.colors );
                     view.setLevel( level );
                 }
             }
         }

    //=========================================================================

         function doGameOver( )
         {
             console.log( 'Game Over' );
             view.setGameOver( );
             audio.play( 'game_over' );
             clearScheduledActions( );
             scheduleAction( 'new game', gameOverDelay );
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

