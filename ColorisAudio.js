/*
  ColorisAudio.js

  Sounds and music for Coloris.
*/


//*****************************************************************************


app = app || { };
app.coloris = app.coloris || { };


//=============================================================================

app.coloris.audio =
    (function()
     {
    //-------------------------------------------------------------------------

         var audioMap = {
             'game_music': { type: 'sequence',
                             names:
                             [
                                 'djdaddio+pinballhd',
                                 'djsobstyle+tetrisrmx',
                                 'djstoltz+hyruletemplessbm',
                                 'djtriplestar+tetrisjumpstyleremix',
                                 'megapixelmusic+cheapnessisasense',
                                 'panto+tetrisrmx',
                                 'theinstrumentals+8bitloserinstrumental',
                                 'zxspectrumtribute+ledstormremix'
                             ],
                             loop: true,
                             random: true
                           },
             'spawn': null,
             'gravity': null,
             'drop': null,
             'shift': '73560__stanestane__blip',
             'rotate': '25885__acclivity__beeprising',
             'failed_shift': null,
             'failed_rotate': null,
             'lock': '34208__acclivity__tongueclick1',
             'clear': '162473__kastenfrosch__successful',
             'collapse': '51462__andre-rocha-nascimento__basket-ball-03-drop-wav',
             'level_up': '109662__grunz__success',
             'game_over': '76376__spazzo-1493__game-over'
         };
         
    //=========================================================================

         function play( name )
         {
             if ( app.settings.enableSound )
             {
                 εδ.audio.play( audioMap[ name ] );
             }
         }
         
    //=========================================================================
         
         return {
             play: play
         };
        
    //-------------------------------------------------------------------------
    }
)();


//*****************************************************************************
