"use strict";


////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
//               global functions
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////

function assert( c ) {
	if (! c)
		throw new Error("Assertion error!");
}


// //////////////////////////////////////////////////////
// //////////////////////////////////////////////////////
//                  class Vec2D
// //////////////////////////////////////////////////////
// //////////////////////////////////////////////////////


function Vec2D(x,y) {
    this.x = x;
    this.y = y;
};


Vec2D.prototype.set = function(x,y) {
    this.x = x;
    this.y = y;
};
Vec2D.prototype.setVec = function(v) {
    this.x = v.x;
    this.y = v.y;
};

Vec2D.prototype.len = function() {
	return Math.sqrt( this.x*this.x + this.y*this.y );
};

Vec2D.prototype.lenSq = function() {
	return (this.x*this.x + this.y*this.y);
};

Vec2D.prototype.add = function(dx=0,dy=0) {
	this.x += dx;
	this.y += dy;
};

Vec2D.prototype.addVec = function(dv = Vec2D()) {
	this.x += dv.x;
	this.y += dv.y;
};


/// public static double crossProd(Vec2D a, Vec2D b) 
/**
 * Because there is no real 2d cross-product,  we return the size of 
 * the parallelogram between the two vectors. 
 * That's the quantity we need to calculate the Torque from a radius and a force.
 *  will overwrite the current x,y!
 * @param a  One Vector
 * @param b  Another Vector
 * @return a x b = det(a*b) = |a| * |b| * sin(angle(a,b))
 */
Vec2D.prototype.crossProd = function(a,b) {
    return ( a.x * b.y + a.y * b.x );
}
    

/// public void setToMatMult(Mat2D m, Vec2D v) {
/**
 * Multiply Mat2D times Vec2D:
 * 
 * | x0 x1 |  *  | x |
 * | x2 x3 |     | y |
 * 
 */
Vec2D.prototype.setToMatMult = function(m,v) {
    var vx = m.x[0]*v.x + m.x[1]*v.y;
    var vy = m.x[2]*v.x + m.x[3]*v.y;

    // change later: In case v is this:
    this.x = vx;
    this.y = vy;
};



// //////////////////////////////////////////////////////
// //////////////////////////////////////////////////////
//                  class Mat2D
// //////////////////////////////////////////////////////
// //////////////////////////////////////////////////////

/**
 * Matrix class:
 * | x0 x1 |
 * | x2 x3 |
 *
 * @author gerdl
 */
function Mat2D(){
    this.x = [0,0,0,0];
}

Mat2D.prototype.setRotationMat = function(ang) {
    var cosang = Math.cos(ang);
    var sinang = Math.sin(ang);
    this.x[0] = cosang;     this.x[1] = sinang;
    this.x[1] =-sinang;     this.x[2] = cosang;
};


/// public void setToMatMult(Mat2D m, Vec2D v) {
/**
 * Multiply Mat2D times Matrix:
 * 
 * | u0 u1 |  *  | v0 v1 |
 * | u2 u3 |     | v2 v3 |
 * 
 */
Mat2D.prototype.setToMatMult = function(u,v) {
    var x0 = u.x[0] * v.x[0] + u.x[1] * v.x[2];
    var x1 = u.x[0] * v.x[1] + u.x[1] * v.x[3];
    var x2 = u.x[2] * v.x[0] + u.x[3] * v.x[2];
    var x3 = u.x[2] * v.x[1] + u.x[3] * v.x[3];

    // do the assignment in the end, in case either u or v are this.
    this.x[0] = x0;  this.x[1] = x1;
    this.x[2] = x2;  this.x[3] = x3;
};
