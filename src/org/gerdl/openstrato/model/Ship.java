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
	double x,y;    // position
	double vx,vy;  // speed
	
	// economy:
	Resource res;
	
	
	
	/**
	 *  will update the position and speed of the ship.
	 *  Therefore we'll have to calc the center of mass, 
	 *  	then we use the cm as rotation axis for calculating the the angular momentum.
	 * @return 
	 */
	public void update() {
		
		// center of mass, local coords
		double cmx = 0.0, cmy = 0.0, totalmass = 0.0;
		
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
