/*
  Tetrominoes.js

  Tables of the seven tetrominoes.
  Represents common rotation systems, beginning with the spawn orientation and
  rotating clockwise.
  NOTES:
  1. See http://tetris.wikia.com/wiki/Rotation_system.
*/

//*****************************************************************************


var app = app || { };
app.coloris = app.coloris || { };


//=============================================================================

app.coloris.originalTetrominoes =
    [
        [ //I
            [ //0
                { x: -1, y: 0 },
                { x: 0, y: 0 },
                { x: 1, y: 0 },
                { x: 2, y: 0 }
            ],
            [ //1
                { x: 1, y: -2 },
                { x: 1, y: -1 },
                { x: 1, y: 0 },
                { x: 1, y: 1 }
            ],
            [ //2
                { x: -1, y: 0 },
                { x: 0, y: 0 },
                { x: 1, y: 0 },
                { x: 2, y: 0 }
            ],
            [ //3
                { x: 1, y: -2 },
                { x: 1, y: -1 },
                { x: 1, y: 0 },
                { x: 1, y: 1 }
            ]
        ],
        [ //J
            [ //0
                { x: -1, y: 0 },
                { x: 0, y: 0 },
                { x: 1, y: -1 },
                { x: 1, y: 0 }
            ],
            [ //1
                { x: -1, y: -1 },
                { x: 0, y: -1 },
                { x: 0, y: 0 },
                { x: 0, y: 1 }
            ],
            [ //2
                { x: -1, y: 0 },
                { x: -1, y: 1 },
                { x: 0, y: 0 },
                { x: 1, y: 0 }
            ],
            [ //3
                { x: 0, y: -1 },
                { x: 0, y: 0 },
                { x: 0, y: 1 },
                { x: 1, y: 1 }
            ]
        ],
        [ //L
            [ //0
                { x: -1, y: -1 },
                { x: -1, y: 0 },
                { x: 0, y: 0 },
                { x: 1, y: 0 }
            ],
            [ //1
                { x: -1, y: 1 },
                { x: 0, y: -1 },
                { x: 0, y: 0 },
                { x: 0, y: 1 }
            ],
            [ //2
                { x: -1, y: 0 },
                { x: 0, y: 0 },
                { x: 1, y: 0 },
                { x: 1, y: 1 }
            ],
            [ //3
                { x: 0, y: -1 },
                { x: 0, y: 0 },
                { x: 0, y: 1 },
                { x: 1, y: -1 }
            ]
        ],
        [ //O
            [ //0
                { x: 0, y: -1 },
                { x: 0, y: 0 },
                { x: 1, y: -1 },
                { x: 1, y: 0 }
            ],
            [ //1
                { x: 0, y: -1 },
                { x: 0, y: 0 },
                { x: 1, y: -1 },
                { x: 1, y: 0 }
            ],
            [ //2
                { x: 0, y: -1 },
                { x: 0, y: 0 },
                { x: 1, y: -1 },
                { x: 1, y: 0 }
            ],
            [ //3
                { x: 0, y: -1 },
                { x: 0, y: 0 },
                { x: 1, y: -1 },
                { x: 1, y: 0 }
            ]
        ],
        [ //S
            [ //0
                { x: -1, y: -1 },
                { x: 0, y: -1 },
                { x: 0, y: 0 },
                { x: 1, y: 0 }
            ],
            [ //1
                { x: 0, y: 0 },
                { x: 0, y: 1 },
                { x: 1, y: -1 },
                { x: 1, y: 0 }
            ],
            [ //2
                { x: -1, y: -1 },
                { x: 0, y: -1 },
                { x: 0, y: 0 },
                { x: 1, y: 0 }
            ],
            [ //3
                { x: 0, y: 0 },
                { x: 0, y: 1 },
                { x: 1, y: -1 },
                { x: 1, y: 0 }
            ]
        ],
        [ //T
            [ //0
                { x: -1, y: 0 },
                { x: 0, y: -1 },
                { x: 0, y: 0 },
                { x: 1, y: 0 }
            ],
            [ //1
                { x: -1, y: 0 },
                { x: 0, y: -1 },
                { x: 0, y: 0 },
                { x: 0, y: 1 }
            ],
            [ //2
                { x: -1, y: 0 },
                { x: 0, y: 0 },
                { x: 0, y: 1 },
                { x: 1, y: 0 }
            ],
            [ //3
                { x: 0, y: -1 },
                { x: 0, y: 0 },
                { x: 0, y: 1 },
                { x: 1, y: 0 }
            ]
        ],
        [ //Z
            [ //0
                { x: -1, y: 0 },
                { x: 0, y: -1 },
                { x: 0, y: 0 },
                { x: 1, y: -1 }
            ],
            [ //1
                { x: 0, y: -1 },
                { x: 0, y: 0 },
                { x: 1, y: 0 },
                { x: 1, y: 1 }
            ],
            [ //2
                { x: -1, y: 0 },
                { x: 0, y: -1 },
                { x: 0, y: 0 },
                { x: 1, y: -1 }
            ],
            [ //3
                { x: 0, y: -1 },
                { x: 0, y: 0 },
                { x: 1, y: 0 },
                { x: 1, y: 1 }
            ]
        ]
    ];

//=============================================================================

app.coloris.srsTetrominoes =
    [
        [ //I
            [ //0
                { x: -1, y: 0 },
                { x: 0, y: 0 },
                { x: 1, y: 0 },
                { x: 2, y: 0 }
            ],
            [ //1
                { x: 1, y: -2 },
                { x: 1, y: -1 },
                { x: 1, y: 0 },
                { x: 1, y: 1 }
            ],
            [ //2
                { x: -1, y: -1 },
                { x: 0, y: -1 },
                { x: 1, y: -1 },
                { x: 2, y: -1 }
            ],
            [ //3
                { x: 0, y: -2 },
                { x: 0, y: -1 },
                { x: 0, y: 0 },
                { x: 0, y: 1 }
            ]
        ],
        [ //J
            [ //0
                { x: -1, y: -1 },
                { x: -1, y: 0 },
                { x: 0, y: -1 },
                { x: 1, y: -1 }
            ],
            [ //1
                { x: 0, y: -2 },
                { x: 0, y: -1 },
                { x: 0, y: 0 },
                { x: 1, y: 0 }
            ],
            [ //2
                { x: -1, y: -1 },
                { x: 0, y: -1 },
                { x: 1, y: -2 },
                { x: 1, y: -1 }
            ],
            [ //3
                { x: -1, y: -2 },
                { x: 0, y: -2 },
                { x: 0, y: -1 },
                { x: 0, y: 0 }
            ]
        ],
        [ //L
            [ //0
                { x: -1, y: -1 },
                { x: 0, y: -1 },
                { x: 1, y: -1 },
                { x: 1, y: 0 }
            ],
            [ //1
                { x: 0, y: -2 },
                { x: 0, y: -1 },
                { x: 0, y: 0 },
                { x: 1, y: -2 }
            ],
            [ //2
                { x: -1, y: -2 },
                { x: -1, y: -1 },
                { x: 0, y: -1 },
                { x: 1, y: -1 }
            ],
            [ //3
                { x: -1, y: 0 },
                { x: 0, y: -2 },
                { x: 0, y: -1 },
                { x: 0, y: 0 }
            ]
        ],
        [ //O
            [ //0
                { x: 0, y: -1 },
                { x: 0, y: 0 },
                { x: 1, y: -1 },
                { x: 1, y: 0 }
            ],
            [ //1
                { x: 0, y: -1 },
                { x: 0, y: 0 },
                { x: 1, y: -1 },
                { x: 1, y: 0 }
            ],
            [ //2
                { x: 0, y: -1 },
                { x: 0, y: 0 },
                { x: 1, y: -1 },
                { x: 1, y: 0 }
            ],
            [ //3
                { x: 0, y: -1 },
                { x: 0, y: 0 },
                { x: 1, y: -1 },
                { x: 1, y: 0 }
            ]
        ],
        [ //S
            [ //0
                { x: -1, y: -1 },
                { x: 0, y: -1 },
                { x: 0, y: 0 },
                { x: 1, y: 0 }
            ],
            [ //1
                { x: 0, y: -1 },
                { x: 0, y: 0 },
                { x: 1, y: -2 },
                { x: 1, y: -1 }
            ],
            [ //2
                { x: -1, y: -2 },
                { x: 0, y: -2 },
                { x: 0, y: -1 },
                { x: 1, y: -1 }
            ],
            [ //3
                { x: -1, y: -1 },
                { x: -1, y: 0 },
                { x: 0, y: -2 },
                { x: 0, y: -1 }
            ]
        ],
        [ //T
            [ //0
                { x: -1, y: -1 },
                { x: 0, y: -1 },
                { x: 0, y: 0 },
                { x: 1, y: -2 }
            ],
            [ //1
                { x: 0, y: -2 },
                { x: 0, y: -1 },
                { x: 0, y: 0 },
                { x: 1, y: -1 }
            ],
            [ //2
                { x: -1, y: -1 },
                { x: 0, y: -2 },
                { x: 0, y: -1 },
                { x: 1, y: -1 }
            ],
            [ //3
                { x: -1, y: -1 },
                { x: 0, y: -2 },
                { x: 0, y: -1 },
                { x: 0, y: 0 }
            ]
        ],
        [ //Z
            [ //0
                { x: -1, y: 0 },
                { x: 0, y: -1 },
                { x: 0, y: 0 },
                { x: 1, y: -2 },
            ],
            [ //1
                { x: 0, y: -2 },
                { x: 0, y: -1 },
                { x: 1, y: -1 },
                { x: 1, y: 0 }
            ],
            [ //2
                { x: -1, y: -1 },
                { x: 0, y: -2 },
                { x: 0, y: -1 },
                { x: 1, y: -2 }
            ],
            [ //3
                { x: -1, y: -2 },
                { x: -1, y: -1 },
                { x: 0, y: -1 },
                { x: 0, y: 0 }
            ]
        ]
    ];

//=============================================================================

app.coloris.segaTetrominoes =
    [
        [ //I
            [ //0
                { x: -1, y: 0 },
                { x: 0, y: 0 },
                { x: 1, y: 0 },
                { x: 2, y: 0 }
            ],
            [ //1
                { x: 1, y: 1 },
                { x: 1, y: 0 },
                { x: 1, y: -1 },
                { x: 1, y: -2 }
            ],
            [ //2
                { x: -1, y: 0 },
                { x: 0, y: 0 },
                { x: 1, y: 0 },
                { x: 2, y: 0 }
            ],
            [ //3
                { x: 1, y: 1 },
                { x: 1, y: 0 },
                { x: 1, y: -1 },
                { x: 1, y: -2 }
            ]
        ],
        [ //J
            [ //0
                { x: -1, y: 0 },
                { x: 0, y: 0 },
                { x: 1, y: 0 },
                { x: 1, y: -1 }
            ],
            [ //1
                { x: 0, y: 1 },
                { x: 0, y: 0 },
                { x: -1, y: -1 },
                { x: 0, y: -1 }
            ],
            [ //2
                { x: -1, y: 0 },
                { x: -1, y: -1 },
                { x: 0, y: -1 },
                { x: 1, y: -1 }
            ],
            [ //3
                { x: 0, y: 1 },
                { x: 1, y: 1 },
                { x: 0, y: 0 },
                { x: 0, y: -1 }
            ]
        ],
        [ //L
            [ //0
                { x: 0, y: 0 },
                { x: 1, y: 0 },
                { x: 0, y: -1 },
                { x: 1, y: -1 }
            ],
            [ //1
                { x: 0, y: 0 },
                { x: 1, y: 0 },
                { x: 0, y: -1 },
                { x: 1, y: -1 }
            ],
            [ //2
                { x: 0, y: 0 },
                { x: 1, y: 0 },
                { x: 0, y: -1 },
                { x: 1, y: -1 }
            ],
            [ //3
                { x: 0, y: 0 },
                { x: 1, y: 0 },
                { x: 0, y: -1 },
                { x: 1, y: -1 }
            ]
        ],
        [ //O
            [ //0
                { x: 0, y: 0 },
                { x: 1, y: 0 },
                { x: 0, y: -1 },
                { x: 1, y: -1 }
            ],
            [ //1
                { x: 0, y: 0 },
                { x: 1, y: 0 },
                { x: 0, y: -1 },
                { x: 1, y: -1 }
            ],
            [ //2
                { x: 0, y: 0 },
                { x: 1, y: 0 },
                { x: 0, y: -1 },
                { x: 1, y: -1 }
            ],
            [ //3
                { x: 0, y: 0 },
                { x: 1, y: 0 },
                { x: 0, y: -1 },
                { x: 1, y: -1 }
            ]
        ],
        [ //S
            [ //0
                { x: 0, y: 0 },
                { x: 1, y: 0 },
                { x: -1, y: -1 },
                { x: 0, y: -1 }
            ],
            [ //1
                { x: -1, y: 1 },
                { x: -1, y: 0 },
                { x: 0, y: 0 },
                { x: 0, y: -1 }
            ],
            [ //2
                { x: 0, y: 0 },
                { x: 1, y: 0 },
                { x: -1, y: -1 },
                { x: 0, y: -1 }
            ],
            [ //3
                { x: -1, y: 1 },
                { x: -1, y: 0 },
                { x: 0, y: 0 },
                { x: 0, y: -1 }
            ]
        ],
        [ //T
            [ //0
                { x: -1, y: 0 },
                { x: 0, y: 0 },
                { x: 1, y: 0 },
                { x: 0, y: -1 }
            ],
            [ //1
                { x: 0, y: 1 },
                { x: -1, y: 0 },
                { x: 0, y: 0 },
                { x: 0, y: -1 }
            ],
            [ //2
                { x: 0, y: 0 },
                { x: -1, y: -1 },
                { x: 0, y: -1 },
                { x: 1, y: -1 }
            ],
            [ //3
                { x: 0, y: 1 },
                { x: 0, y: 0 },
                { x: 1, y: 0 },
                { x: 0, y: -1 }
            ]
        ],
        [ //Z
            [ //0
                { x: -1, y: 0 },
                { x: 0, y: 0 },
                { x: 0, y: -1 },
                { x: 1, y: -1 }
            ],
            [ //1
                { x: 1, y: 1 },
                { x: 0, y: 0 },
                { x: 1, y: 0 },
                { x: 0, y: -1 }
            ],
            [ //2
                { x: -1, y: 0 },
                { x: 0, y: 0 },
                { x: 0, y: -1 },
                { x: 1, y: -1 }
            ],
            [ //3
                { x: 1, y: 1 },
                { x: 0, y: 0 },
                { x: 1, y: 0 },
                { x: 0, y: -1 }
            ]
        ]
    ];

//=============================================================================

app.coloris.nintendoTetrominoes =
    [
        [ //I
            [ //0
                { x: -1, y: -1 },
                { x: 0, y: -1 },
                { x: 1, y: -1 },
                { x: 2, y: -1 }
            ],
            [ //1
                { x: 1, y: -2 },
                { x: 1, y: -1 },
                { x: 1, y: 0 },
                { x: 1, y: 1 }
            ],
            [ //2
                { x: -1, y: -1 },
                { x: 0, y: -1 },
                { x: 1, y: -1 },
                { x: 2, y: -1 }
            ],
            [ //3
                { x: 1, y: -2 },
                { x: 1, y: -1 },
                { x: 1, y: 0 },
                { x: 1, y: 1 }
            ]
        ],
        [ //J
            [ //0
                { x: -1, y: 0 },
                { x: 0, y: 0 },
                { x: 1, y: -1 },
                { x: 1, y: 0 }
            ],
            [ //1
                { x: -1, y: -1 },
                { x: 0, y: -1 },
                { x: 0, y: 0 },
                { x: 0, y: 1 }
            ],
            [ //2
                { x: -1, y: 0 },
                { x: -1, y: 1 },
                { x: 0, y: 0 },
                { x: 1, y: 0 }
            ],
            [ //3
                { x: 0, y: -1 },
                { x: 0, y: 0 },
                { x: 0, y: 1 },
                { x: 1, y: 1 }
            ]
        ],
        [ //L
            [ //0
                { x: -1, y: -1 },
                { x: -1, y: 0 },
                { x: 0, y: 0 },
                { x: 1, y: 0 }
            ],
            [ //1
                { x: -1, y: 1 },
                { x: 0, y: -1 },
                { x: 0, y: 0 },
                { x: 0, y: 1 }
            ],
            [ //2
                { x: -1, y: 0 },
                { x: 0, y: 0 },
                { x: 1, y: 0 },
                { x: 1, y: 1 }
            ],
            [ //3
                { x: 0, y: -1 },
                { x: 0, y: 0 },
                { x: 0, y: 1 },
                { x: 1, y: -1 }
            ]
        ],
        [ //O
            [ //0
                { x: 0, y: -1 },
                { x: 0, y: 0 },
                { x: 1, y: -1 },
                { x: 1, y: 0 }
            ],
            [ //1
                { x: 0, y: -1 },
                { x: 0, y: 0 },
                { x: 1, y: -1 },
                { x: 1, y: 0 }
            ],
            [ //2
                { x: 0, y: -1 },
                { x: 0, y: 0 },
                { x: 1, y: -1 },
                { x: 1, y: 0 }
            ],
            [ //3
                { x: 0, y: -1 },
                { x: 0, y: 0 },
                { x: 1, y: -1 },
                { x: 1, y: 0 }
            ]
        ],
        [ //S
            [ //0
                { x: -1, y: -1 },
                { x: 0, y: -1 },
                { x: 0, y: 0 },
                { x: 1, y: 0 }
            ],
            [ //1
                { x: 0, y: 0 },
                { x: 0, y: 1 },
                { x: 1, y: -1 },
                { x: 1, y: 0 }
            ],
            [ //2
                { x: -1, y: -1 },
                { x: 0, y: -1 },
                { x: 0, y: 0 },
                { x: 1, y: 0 }
            ],
            [ //3
                { x: 0, y: 0 },
                { x: 0, y: 1 },
                { x: 1, y: -1 },
                { x: 1, y: 0 }
            ]
        ],
        [ //T
            [ //0
                { x: -1, y: 0 },
                { x: 0, y: -1 },
                { x: 0, y: 0 },
                { x: 1, y: 0 }
            ],
            [ //1
                { x: -1, y: 0 },
                { x: 0, y: -1 },
                { x: 0, y: 0 },
                { x: 0, y: 1 }
            ],
            [ //2
                { x: -1, y: 0 },
                { x: 0, y: 0 },
                { x: 0, y: 1 },
                { x: 1, y: 0 }
            ],
            [ //3
                { x: 0, y: -1 },
                { x: 0, y: 0 },
                { x: 0, y: 1 },
                { x: 1, y: 0 }
            ]
        ],
        [ //Z
            [ //0
                { x: -1, y: 0 },
                { x: 0, y: -1 },
                { x: 0, y: 0 },
                { x: 1, y: -1 }
            ],
            [ //1
                { x: 0, y: -1 },
                { x: 0, y: 0 },
                { x: 1, y: 0 },
                { x: 1, y: 1 }
            ],
            [ //2
                { x: -1, y: 0 },
                { x: 0, y: -1 },
                { x: 0, y: 0 },
                { x: 1, y: -1 }
            ],
            [ //3
                { x: 0, y: -1 },
                { x: 0, y: 0 },
                { x: 1, y: 0 },
                { x: 1, y: 1 }
            ]
        ]
    ];

//=============================================================================

app.coloris.dtetTetrominoes =
    [
        [ //I
            [ //0
                { x: -1, y: 0 },
                { x: 0, y: 0 },
                { x: 1, y: 0 },
                { x: 2, y: 0 }
            ],
            [ //1
                { x: 1, y: 2 },
                { x: 1, y: 1 },
                { x: 1, y: 0 },
                { x: 1, y: -1 }
            ],
            [ //2
                { x: -1, y: 0 },
                { x: 0, y: 0 },
                { x: 1, y: 0 },
                { x: 2, y: 0 }
            ],
            [ //3
                { x: 0, y: 2 },
                { x: 0, y: 1 },
                { x: 0, y: 0 },
                { x: 0, y: -1 }
            ]
        ],
        [ //J
            [ //0
                { x: -1, y: 0 },
                { x: 0, y: 0 },
                { x: 1, y: 0 },
                { x: 1, y: -1 }
            ],
            [ //1
                { x: 0, y: 1 },
                { x: 0, y: 0 },
                { x: -1, y: -1 },
                { x: 0, y: -1 }
            ],
            [ //2
                { x: -1, y: 0 },
                { x: -1, y: -1 },
                { x: 0, y: -1 },
                { x: 1, y: -1 }
            ],
            [ //3
                { x: 0, y: 1 },
                { x: 1, y: 1 },
                { x: 0, y: 0 },
                { x: 0, y: -1 }
            ]
        ],
        [ //L
            [ //0
                { x: 0, y: 0 },
                { x: 1, y: 0 },
                { x: 0, y: -1 },
                { x: 1, y: -1 }
            ],
            [ //1
                { x: 0, y: 0 },
                { x: 1, y: 0 },
                { x: 0, y: -1 },
                { x: 1, y: -1 }
            ],
            [ //2
                { x: 0, y: 0 },
                { x: 1, y: 0 },
                { x: 0, y: -1 },
                { x: 1, y: -1 }
            ],
            [ //3
                { x: 0, y: 0 },
                { x: 1, y: 0 },
                { x: 0, y: -1 },
                { x: 1, y: -1 }
            ]
        ],
        [ //O
            [ //0
                { x: 0, y: 0 },
                { x: 1, y: 0 },
                { x: 0, y: -1 },
                { x: 1, y: -1 }
            ],
            [ //1
                { x: 0, y: 0 },
                { x: 1, y: 0 },
                { x: 0, y: -1 },
                { x: 1, y: -1 }
            ],
            [ //2
                { x: 0, y: 0 },
                { x: 1, y: 0 },
                { x: 0, y: -1 },
                { x: 1, y: -1 }
            ],
            [ //3
                { x: 0, y: 0 },
                { x: 1, y: 0 },
                { x: 0, y: -1 },
                { x: 1, y: -1 }
            ]
        ],
        [ //S
            [ //0
                { x: 0, y: 0 },
                { x: 1, y: 0 },
                { x: -1, y: -1 },
                { x: 0, y: -1 }
            ],
            [ //1
                { x: 0, y: 1 },
                { x: 0, y: 0 },
                { x: 1, y: 0 },
                { x: 1, y: -1 }
            ],
            [ //2
                { x: 0, y: 0 },
                { x: 1, y: 0 },
                { x: -1, y: -1 },
                { x: 0, y: -1 }
            ],
            [ //3
                { x: -1, y: 1 },
                { x: -1, y: 0 },
                { x: 0, y: 0 },
                { x: 0, y: -1 }
            ]
        ],
        [ //T
            [ //0
                { x: -1, y: 0 },
                { x: 0, y: 0 },
                { x: 1, y: 0 },
                { x: 0, y: -1 }
            ],
            [ //1
                { x: 0, y: 1 },
                { x: -1, y: 0 },
                { x: 0, y: 0 },
                { x: 0, y: -1 }
            ],
            [ //2
                { x: 0, y: 0 },
                { x: -1, y: -1 },
                { x: 0, y: -1 },
                { x: 1, y: -1 }
            ],
            [ //3
                { x: 0, y: 1 },
                { x: 0, y: 0 },
                { x: 1, y: 0 },
                { x: 0, y: -1 }
            ]
        ],
        [ //Z
            [ //0
                { x: -1, y: 0 },
                { x: 0, y: 0 },
                { x: 0, y: -1 },
                { x: 1, y: -1 }
            ],
            [ //1
                { x: 1, y: 1 },
                { x: 0, y: 0 },
                { x: 1, y: 0 },
                { x: 0, y: -1 }
            ],
            [ //2
                { x: -1, y: 0 },
                { x: 0, y: 0 },
                { x: 0, y: -1 },
                { x: 1, y: -1 }
            ],
            [ //3
                { x: 0, y: 1 },
                { x: -1, y: 0 },
                { x: 0, y: 0 },
                { x: -1, y: -1 }
            ]
        ]
    ];

//*****************************************************************************
