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
    
    if (x === undefined) this.x = 555;
};


Vec2D.prototype.set = function(x,y) {
    this.x = x;
    this.y = y;
};

Vec2D.prototype.len = function() {
	return Math.sqrt( this.x*this.x + this.y*this.y );
};

Vec2D.prototype.lenSq = function() {
	return (this.x*this.x + this.y*this.y);
};

Vec2D.prototype.add = function(dx,dy) {
	this.x += dx;
	this.y += dy;
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
    this.x = m.x[0]*v.x + m.x[1]*v.y;
    this.y = m.x[2]*v.x + m.x[3]*v.y;
}



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
    
    

