package org.gerdl.openstrato.model;

import java.util.Iterator;
import java.util.List;
import java.util.Vector;

import org.gerdl.utils.Vec2D;

public abstract class Ship {

	// convenience:
	protected Sim  mysim;
	
	// ship systems:
	protected List<ShipSystem> systems = new Vector<ShipSystem>();
	// economy:
	Resource res;
	
	// static physics: const as long as the ship design is not changing: 
	Vec2D  cm  = new Vec2D();     // cm, center of mass in local coords
	double totalmass;  
	double I; 	   // Moment of inertia

	// dynamic physics: Changes at every timestep:
	Vec2D  pos = new Vec2D();     // position in the world coord system
	Vec2D  v   = new Vec2D();  // speed of the cm
	double dir;    // angle
	double w;      // angular velocity
	
	
	public Ship(Sim _mysim) {
		mysim = _mysim;
		
		updateCenterOfMassAndInertia();
	}
	
	
	/**
	 *  will forward-Euler update the position and speed of the ship.
	 *  Therefore we'll have to calc the center of mass, 
	 *  	then we use the cm as rotation axis for calculating the the angular momentum.
	 *  
	 *  How do we implement the rotations:
	 *  The torque \tau corresponds to the force F in the rotation sense, around the center of mass
	 *    	\tau = r \cross F         // the cross product considers only the part of the force that is perpendicular to the radius r
	 *  Now for multiple Forces:
	 *    	\tau = \sum_i (r_i \cross F_i)
	 *  
	 *  Angular momentum L,            corresponds to the impulse p in linear movement
	 *  Moment of Inertia I,           corresponds to the mass in linear movement
	 *  Angular velocity w,            corresponds to speed v
	 *  Angular acceleration \alpha    corresponds to acceleration a 
	 *  
	 *  	L = I w
	 *  
	 *  	\tau = dL / dt = d(Iw) / dt = I dw/dt = I \alpha
	 *  
	 *  For the rotation, we need to calculate dw: the change in the angular velocity:
	 *  
	 *  	\alpha = dw/dt = \tau / I
	 *  
	 *  	dw = \tau * dt / (I)	
	 *  
	 *  Now what's missing is the Moment of Inertia I... How do we calculate this?
	 *  
	 *  	I = \sum_i (m_i r_i^2) 
	 *  
	 * @return 
	 */
	public void update(double dt) {
		
		//updateEconomy();
		
		//updateControllers();
		
		// / / / / / / / / / / / /  
		// updateForces();
		
		Vec2D  f   = new Vec2D();    // for linear movement: linear forces
		double tau = 0;              // for angular rotation: Calculate Torque
		
		// disposable Vect2D
		Vec2D r = new Vec2D();
		
		// calculating force f and torque tau:
		for (ShipSystem s: systems) {
			if (!(s instanceof IForceExcertingShipSystem))
				continue;
			IForceExcertingShipSystem fs = (IForceExcertingShipSystem) s;
			
			Vec2D ffs = fs.getForceVect(); // force excerted by this component s
			
			f.add( ffs );
		
			// we're not interested in the radius from the coordinate center,
			// but in the radius to the rotation center, i.e., the center of mass:
			r.set( s.getlPos() );
			r.sub( cm );
			
			tau +=  Vec2D.crossProd(r, ffs);
		}
		
		
		
		// / / / / / / / / / / / / / / / / / / / / /
		// updatePositions(): simple forward Euler
		//  a  = f / m;
		//  dv = a * dt;
		//  dx = v * dt;
		
		Vec2D a = new Vec2D( f.x / totalmass, f.y / totalmass);
		v  .add( a.x*dt, a.y*dt );
        // TODO: add a bit of viscosity or friction!
		pos.add( v.x*dt, v.y*dt ); 
		
		// bot now for the rotation!
        w   += tau * dt / I;    // torque tau, Moment of inertia I
        // a bit of friction to the angular velocity!
		dir += w * dt;          // angular velocity w

        // build rotation matrix:
        
        
		//  we also have to adjust the 0-position for the rotation around the center of mass:
        //  If we rotate 12° around the cm, we have to rotate
        
		//updateGlobalCoords();

	}
	
	

	/**
	 * when new systems are added or destroyed, we'll have to update the center of mass. 
	 * @return 
	 */
	private void updateCenterOfMassAndInertia() {

		// center of mass, local coords:
		cm.set(0,0);
        totalmass = 0;
		for (ShipSystem s: systems) {
			cm.x += (double)s.dx * s.mass;
			cm.y += (double)s.dy * s.mass;
			totalmass += s.mass;
		}
		assert( totalmass > 0.0);
		cm.x /= totalmass;
		cm.y /= totalmass;

		
		// Now that we know the center of mass, we can calculate the 
		// Moment of Inertia, I:
		I = 0;
		for (ShipSystem s: systems) {
			I += s.getlPos().lenSq() * s.mass;
		}
		

	}
	
	
	
}
