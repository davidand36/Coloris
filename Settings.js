/*
  Settings.js

  Settings (user preferences, etc.) for the game.
*/


//*****************************************************************************


var app = app || { };


//=============================================================================


app.settings =
    {
        enableSound: true,
        enableMusic: false
    };

//-----------------------------------------------------------------------------

app.settings.rules =
    {
        wellWidth: 10, //8-12
        wellHeight: 22, //~2*width + hidden
        hiddenRows: 2, //0-2
        rotationSystem: 'original', //'original', 'srs', 'sega', 'nintendo', 'dtet'
        randomizerAlgorithm: 'uniform', //'uniform', 'bag'
        spawnDelay: 0.5, //sec (0 or more)
        shapeColorMatch: true,
        numLevels: 20,
        levelUp: { basedOn: 'clears',
                   number: 2
                 },
        levelColors: { colorOrder: [ 0, 2, 4, 6, 1, 5, 3 ],
                       min: 3,
                       levelsPerStep: 3
                     },
        levelGravity: { curve:  'linear time', //'linear time', 'linear speed',
                        min: 0.75, //sec/row (slowest)
                        max: 0.05  //sec/row (fastest)
                      },
        drop: "hard",
        lockDelay: 0.5, //sec (0 or more)
        lockDelayOnDrop: true, //boolean
        resetLockDelayOnMove: false, //boolean, a.k.a. "infinity"
        delayedAutoShift: { delay: 1.0, repeat: 0.1 },
        dasPreload: false,
        kick: 'right left up', //'none', 'right left', 'right left up'
        clearDelay: 0.5, //sec (0 or more)
        collapseDelay: 0.1, //sec (0 or more)
        showGhostPiece: true //boolean
    };

//-----------------------------------------------------------------------------

app.settings.keyMap =
    {
        "left": "shift left",
        "right": "shift right",
        "PgUp": "rotate counter-clockwise",
        "PgDn": "rotate clockwise",
        "up": "rotate counter-clockwise",
        "down": "drop"
    };

//*****************************************************************************
