"use strict";

/**
 *   This module, openStratoRenerer defines a rendering system, in this case
 *   using WebGL.
 *   Maybe later I'm going to write a renderer for android or SDL, etc...
 *
 *   Still, GraphicsSet is abstract - it needs to be extended with a practical graphics set,
 *   for example testgame1graphics.js
 */


// //////////////////////////////////////////////////////
// //////////////////////////////////////////////////////
//            class FlightView
// //////////////////////////////////////////////////////
// //////////////////////////////////////////////////////

function FlightView(game) {
    this.g   = game;
    this.cam = new CameraController();
}


FlightView.prototype.render = function() {

    this.cam.update(); // pan camera
    
    for (var i in this.g.sim.parts) {
        var p = this.g.sim.parts[i];

        // get the sprite associated with this simulation participant:
        var s = p.getRenderer();

        // transform coordinates:
        
        s.render();
    }
};

FlightView.prototype.setWorld = function(world) {
    this.cam = new CameraController(world.dx, world.dy);
};

// //////////////////////////////////////////////////////
// //////////////////////////////////////////////////////
//            CameraController
// //////////////////////////////////////////////////////
// //////////////////////////////////////////////////////
function CameraController(mx,my) {
    this.mx=mx, this.my=my;  // maxx maxy

    this.cx=mx/2, this.cy=my/2;  // current x,y position of the cam
    this.visx=20.0;
    this.vx=0, this.vy=0;  // scrolling speed
}

CameraController.prototype.onCameraDrag = function(dx,dy) {

};


CameraController.prototype.update = function() {
    //TODO: Check if pShip leaves screen

    // TODO: Move/Scroll/ camera
};


// //////////////////////////////////////////////////////
// //////////////////////////////////////////////////////
//            astract class GraphicsSet
// //////////////////////////////////////////////////////
// //////////////////////////////////////////////////////

function GraphicsSet() {
    this.sprites = [];   // list of Sprites
}


/**
 *   getRenderer is called by 
 */
// Sprite requestRenderer (String identi)
GraphicsSet.prototype.requestRenderer = null;

// //////////////////////////////////////////////////////
// //////////////////////////////////////////////////////
//                  final class Sprite
// //////////////////////////////////////////////////////
// //////////////////////////////////////////////////////


function Sprite(u1,v1,u2,v2,fname) {

    // u,v are the texture coordinates
    this.u1 = 0.0; 
    this.v1 = 0.0;
    this.u2 = 1.0;
    this.v2 = 1.0;

    if (fname !== undefined) {

        // define a texture image:
        var image = new Image();
        image.src = fname;
                
        // the texture, probably int, maybe a gl specific thing
        this.texture = gl.createTexture();

        gl.bindTexture(gl.TEXTURE_2D, this.texture);

        // Set the parameters so we can render any size image.
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        
        // Upload the image into the texture.
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    }
};

/// x,y are screen coordinates
Sprite.prototype.draw = function(x1,y1,x2,y2) {
    assert( false );
};

// don't actually create a new GL texture, just use a subarea of an existing texture!
Sprite.prototype.getSubsprite = function(u1,v1,u2,v2) {
    var sp = new Sprite(u1,v1,u2,v2);
    sp.texture = this.texture;
    return returen sp;
};
