"use strict";

/*
 *   This module, openStratoRenerer, defines a rendering system, in this case
 *   using WebGL.
 *   Maybe later I'm going to write a renderer for android or SDL, etc...
 *
 *   Still, GraphicsSet is abstract - it needs to be extended with a practical graphics set,
 *   for example testgame1graphics.js
 */

// //////////////////////////////////////////////////////
// //////////////////////////////////////////////////////
//            static class GerdlGL
// //////////////////////////////////////////////////////
// //////////////////////////////////////////////////////
var GerdlGL = function() {};


GerdlGL.init = function(canvas) {

    try {
        var gl = canvas.getContext("experimental-webgl");
        gl.viewportWidth = canvas.width;
        gl.viewportHeight = canvas.height;
        this.gl = gl;
    } catch(e) {
        alert("Uh-oh - very bad things happening, seems like WebGL doesn't work.");
    }
};


GerdlGL.initShaders = function() {
    var gl = this.gl;
    var fragmentShader = this.getShader(gl, "shader-fs",gl.FRAGMENT_SHADER);
    var vertexShader   = this.getShader(gl, "shader-vs",gl.VERTEX_SHADER);

    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS))
       throw new GerdlGLException("Could not initialise shaders");

    gl.useProgram(shaderProgram);

    shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

    shaderProgram.vertexColorAttribute = gl.getAttribLocation(shaderProgram, "aVertexColor");
    gl.enableVertexAttribArray(shaderProgram.vertexColorAttribute);

    shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
    shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");    
};



GerdlGL.getShader = function(scriptString,type) {

    var gl = this.gl;
    var shader;
        shader = gl.createShader(type);

    gl.shaderSource(shader, scriptString);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
        throw new GerdlGLException( gl.getShaderInfoLog(shader) );

    return shader;
};

  /*========================= SHADERS ========================= */
GerdlGL.shader_vertex_source="\n                                   \
attribute vec3 aVertexPosition;                                    \
attribute vec4 aVertexColor;                                       \
                                                                   \
uniform mat4 uMVMatrix;                                            \
uniform mat4 uPMatrix;                                             \
                                                                   \
varying vec4 vColor;                                               \
                                                                   \
void main(void) {                                                  \
  gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0); \
  vColor = aVertexColor;                                           \
}";


GerdlGL.shader_fragment_source="\n\
precision mediump float;\
                        \
varying vec4 vColor;    \
                        \
void main(void) {       \
  gl_FragColor = vColor;\
}";


/**
 *  Google provided function such that the parameter-function is recalled for screen updates.
 */
window.requestAnimFrame = (function() {
  return window.requestAnimationFrame ||
         window.webkitRequestAnimationFrame ||
         window.mozRequestAnimationFrame ||
         window.oRequestAnimationFrame ||
         window.msRequestAnimationFrame ||
         function(/* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
           window.setTimeout(callback, 1000/60);
         };
})();



  /*========================= Exceptions  ========================= */
function GerdlGLException(msg) {this.msg = msg;}



// //////////////////////////////////////////////////////
// //////////////////////////////////////////////////////
//            class FlightView
// //////////////////////////////////////////////////////
// //////////////////////////////////////////////////////

function FlightView(game) {
    this.g   = game;
    this.cam = new CameraController();

    this.pMat  = mat4.create();
    this.mvMat = mat4.create();
}


// To be called, when another view was active before
FlightView.prototype.init = function() {
    GerdlGL.gl.clearColor(0.0, 0.4, 0.2, 1.0);
    GerdlGL.gl.enable(GerdlGL.gl.DEPTH_TEST);
};



FlightView.prototype.render = function() {

    var gl = GerdlGL.gl;
    
    gl.enable(GerdlGL.gl.DEPTH_TEST);
    gl.viewport(0, 0, GerdlGL.gl.viewportWidth, GerdlGL.gl.viewportHeight);
    gl.clearColor(0.0, 0.4, 0.2, 1.0);
    gl.clear(GerdlGL.gl.COLOR_BUFFER_BIT | GerdlGL.gl.DEPTH_BUFFER_BIT);
    
    
    this.cam.update(); // pan camera


    mat4.perspective(this.pMat, 45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0);
     
    mat4.identity(this.mvMat);
     
    mat4.translate(this.mvMat, this.mvMat, [-1.5, 0.0, -7.0]);
    
    
    for (var i in this.g.sim.parts) {
        var p = this.g.sim.parts[i];

        // get the sprite associated with this simulation participant:
        var s = p.getRenderer();

        // transform coordinates:
        var wpos = p.wPos;
        
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
    //this.sprites.push( "fun" );
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

    var gl = GerdlGL.gl;
    
    // u,v are the texture coordinates
    this.u1 = 0.0; 
    this.v1 = 0.0;
    this.u2 = 1.0;
    this.v2 = 1.0;

    if (fname !== undefined) {

        // define a texture image:
        var image = new Image();
                
        // the texture, probably int, maybe a gl specific thing
        this.texture = gl.createTexture();
        //image.crossOrigin = "Anonymous";
        image.src = fname;

        var myTex = this.texture;
        image.onload = function() {    // seems to be a lambda function, such that the local variables from
                                       // the outside scope are inherited.
            gl.bindTexture(gl.TEXTURE_2D, myTex);

            // Set the parameters so we can render any size image.
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            
            // Upload the image into the texture.
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

            // and unbind the texture:
            gl.bindTexture(gl.TEXTURE_2D, null);  // maybe better, such that this image is safed from further modifications!
            };

    }
    else throw new GerdlGLException("Texture image not defined.");
};

/// x,y are screen coordinates
Sprite.prototype.draw = function(gl, x1,y1,x2,y2) {
    assert( false );

    mvPushMatrix();

    mat4.translate(mvMatrix, [-1.5, 0.0, -7.0]);

    gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexPositionBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, triangleVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexColorBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, triangleVertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0);

    
    mvPopMatrix();
};

// don't actually create a new GL texture, just use a subarea of an existing texture!
Sprite.prototype.getSubsprite = function(u1,v1,u2,v2) {
    var sp = new Sprite(u1,v1,u2,v2);
    sp.texture = this.texture;
    return sp;
};
