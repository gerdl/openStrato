package org.gerdl.openstrato.model;

import java.util.Iterator;
import java.util.List;
import java.util.Vector;

public abstract class Ship {

	// convenience:
	protected Sim  mysim;
	
	// ship systems:
	protected List<ShipSystem> systems = new Vector<ShipSystem>();
	
	// physics:
	double x,y;    // position in the world coord system
	double cmx,cmy,totalmass;  // cm, center of mass in local coords
	double vx,vy;  // speed of the cm
	double dir;    // angle
	double w;      // angular velocity
	double Ia; 	   // Moment of inertia
	
	// economy:
	Resource res;
	
	public Ship(Sim _mysim) {
		mysim = _mysim;
		
		updateCenterOfMass();
	}
	
	
	/**
	 *  will update the position and speed of the ship.
	 *  Therefore we'll have to calc the center of mass, 
	 *  	then we use the cm as rotation axis for calculating the the angular momentum.
	 * @return 
	 */
	public void update() {
		
		//updateEconomy();
		
		//updateControllers();
		
		//updateForces();
		double fx=0, fy=0;
		for (ShipSystem s: systems) {
			
			if (!(s instanceof IForceExcertingShipSystem))
				continue;
			IForceExcertingShipSystem fs = (IForceExcertingShipSystem) s;
			
			fx += fs.getForceVectX();
			fy += fs.getForceVectY();
			totalmass += s.mass;
		}
		
		//updateMove();
		
		//updateGlobalCoords();

	}
	
	

	/**
	 * when new systems are added or destroyed, we'll have to update the center of mass. 
	 * @return 
	 */
	private void updateCenterOfMass() {

		// center of mass, local coords:
		for (ShipSystem s: systems) {
			cmx += (double)s.dx * s.mass;
			cmy += (double)s.dy * s.mass;
			totalmass += s.mass;
		}
		assert( totalmass > 0.0);
		cmx /= totalmass;
		cmy /= totalmass;		
	}
	
	
	
}
