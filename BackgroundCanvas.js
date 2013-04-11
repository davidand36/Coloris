/*
  BackgroundCanvas.js

  Draw the background on a canvas.
*/

//*****************************************************************************


var app = app || { };


//*****************************************************************************


app.background =
    (function()
     {
    //-------------------------------------------------------------------------

         var mainCanvas, mainCtx,
             mainBgCanvas,
             levelBgImages = [];
         var levelBgNames =
             [
                 'Palouse_hills_northeast_of_Walla_Walla.jpg',
                 'Monmouth_oregon_main_street.jpg',
                 'Skyline_New_York_City_New_York_from_Rockefeller_Center_at_night.jpg',
                 'Munich-skyline_layover.jpg',
                 'EastBerlin_PotsdamerPlatz.jpg',
                 '01-louvain-la-neuve-17-01-2002.jpg',
                 'VEISHEA2006.jpg',
                 'flickr-3065932904-original.jpg',
                 'Vue_sur_Managua_et_le_lagon.jpg',
                 'Seattle_4.jpg',
                 'Istanbul.jpg'
             ],
             numLevelBgs = levelBgNames.length;

    //=========================================================================

         function drawMain( rect )
         {
             findMainCtx( );
             if ( ! mainBgCanvas )
             {
                 makeMainBg( );
             }

             rect = rect ||
                 { x: 0, y: 0,
                   width: mainCanvas.width,
                   height: mainCanvas.height };
             mainCtx.drawImage( mainBgCanvas,
                                rect.x, rect.y, rect.width, rect.height,
                                rect.x, rect.y, rect.width, rect.height );
         }

    //-------------------------------------------------------------------------

         function findMainCtx( )
         {
             if ( ! mainCtx )
             {
                 mainCanvas = εδ.makeCanvas( 'canvasDiv' );
                 mainCtx = mainCanvas.getContext( '2d' );
             }
         }

    //-------------------------------------------------------------------------

         function makeMainBg( )
         {
             var bgCtx,
                 w, h;
             
             mainBgCanvas = εδ.copyCanvas( mainCanvas );
             bgCtx = mainBgCanvas.getContext( '2d' );
             w = mainBgCanvas.width;
             h = mainBgCanvas.height;

             bgCtx.fillStyle = 'rgb( 42, 4, 74 )';
             bgCtx.fillRect( 0, 0, w, h );
         }

    //=========================================================================

         function loadLevel( level, callback, forceReload )
         {
             var i = level % numLevelBgs,
                 directory = 'images/800x480/', //!!!
                 name = levelBgNames[ i ],
                 image;
             if ( levelBgImages[ i ] && (! forceReload) )
             {
                 if ( callback )
                     callback( );
                 return;
             }
             image = $('<img/>');
             image.on( 'load',
                       function handleLevelBgLoad( )
                       {
                           levelBgImages[ i ] = image[0];
                           if ( callback )
                               callback( );
                       } );
             image[0].src = directory + name;
         }

    //-------------------------------------------------------------------------

         function drawLevel( level, rect )
         {
             var i = level % numLevelBgs,
                 image = levelBgImages[ i ],
                 srcRect, destRect,
                 cw, ch, iw, ih,
                 wRatio, hRatio, off;

             if ( (! mainCtx) || (! image) )
                 return;

             cw = mainCanvas.width;
             ch = mainCanvas.height;
             iw = image.width;
             ih = image.height;
             
             destRect = rect || { x: 0, y: 0, width: cw, height: ch };

             //Scale and offset so the image fills the canvas,
             // the centers line up, and the source aspect ratio is preserved.
             wRatio = iw / cw;
             hRatio = ih / ch;
             if ( wRatio < hRatio )
             {
                 off = (ih / 2)  -  wRatio * (ch / 2);
                 srcRect = { x: wRatio * destRect.x,
                             y: off  +  wRatio * destRect.y,
                             width: wRatio * destRect.width,
                             height: wRatio * destRect.height
                           };
             }
             else
             {
                 off = (iw / 2)  -  hRatio * (cw / 2);
                 srcRect = { x: off  +  hRatio * destRect.x,
                             y: hRatio * destRect.y,
                             width: hRatio * destRect.width,
                             height: hRatio * destRect.height
                           };
             }
             
             mainCtx.drawImage( image,
                                srcRect.x, srcRect.y,
                                srcRect.width, srcRect.height,
                                destRect.x, destRect.y,
                                destRect.width, destRect.height );
         }

    //=========================================================================

         function resize( newDims )
         {
             mainCtx = null;
             findMainCtx( );
             mainBgCanvas = null;
             makeMainBg( );
         }

    //=========================================================================

         return {
             drawMain: drawMain,
             loadLevel: loadLevel,
             drawLevel: drawLevel,
             resize: resize
         };
         
    //-------------------------------------------------------------------------
     }
)();


//*****************************************************************************
