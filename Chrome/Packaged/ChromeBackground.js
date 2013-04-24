/*
  ChromeBackground.js

  Background script for packaged Chrome app.
*/


chrome.app.runtime.onLaunched.addListener(
    function( )
    {
        chrome.app.window.create( 'index.html',
                                  {
                                      width: 800,
                                      height: 480
                                  } );
    } );