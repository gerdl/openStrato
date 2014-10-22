package org.gerdl.utils;

/**
 *  Vector class:
 * 
 *  | x |
 *  | y |
 * 
 * @author gerdl
 */
public class Vec2D {
	
	public double x, y;
	
	public Vec2D() {
		x = 0;
		y = 0;
	}
	public Vec2D(double _x, double _y) {
		x = _x;
		y = _y;
	}

	public void set(int _x, int _y) {
		x = _x;
		y = _y;
	}
	public void set(Vec2D a) {
		x = a.x;
		y = a.y;
	}
	
	
	public double len() {
		return Math.sqrt( x*x + y*y );
	}
	
	public double lenSq() {
		return (x*x + y*y);
	}
	
	public void add(final Vec2D other) {
		x += other.x;
		y += other.y;
	}
	public void add(double dx, double dy) {
		x += dx;
		y += dy;
	}
	public void sub(Vec2D other) {   // for convenience reasons ;)   
		x -= other.x;
		y -= other.y;
	}
	
	/**
	 * Because there is no real 2d cross-product,  we return the size of 
	 * the parallelogram between the two vectors. 
	 * That's the quantity we need to calculate the Torque from a radius and a force.
	 *  will overwrite the current x,y!
	 * @param a  One Vector
	 * @param b  Another Vector
	 * @return a x b = det(a*b) = |a| * |b| * sin(angle(a,b))
	 */
	
	public static double crossProd(Vec2D a, Vec2D b) {
		return ( a.x * b.y + a.y * b.x );
	}
    
    
    /**
     * Multiply Mat2D times Vec2D:
     * 
     * | x0 x1 |  *  | x |
     * | x2 x3 |     | y |
     * 
     */
    public void setToMatMult(Mat2D m, Vec2D v) {
        x = m.x[0]*v.x + m.x[1]*v.y;
        y = m.x[2]*v.x + m.x[3]*v.y;
    }

}
