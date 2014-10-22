package org.gerdl.openstrato.model;

import java.util.List;
import java.util.Vector;

import org.gerdl.utils.Vect2D;

public abstract class ShipSystem {
	
	// convenience:
	protected Ship myship;
	protected Sim  mysim;
	
	protected List<SystemTile> space = new Vector<SystemTile>();
	protected int              dx,dy;  // system's coordinates, relative to ship zero.
	
	// physics:
	double mass;
	double dir = 0;   // A system can be built in any direction.
	Vect2D lPos = new Vect2D();      // local position
	Vect2D wPos = new Vect2D(); 
	
	
	public ShipSystem(Ship _myship, Sim _mysim) {
		myship = _myship;
		mysim  = _mysim;
		
		dx=0; dy=0;
	}

	// retrieve local position, in ship coordinates
	public Vect2D getlPos() {return lPos;}
}
