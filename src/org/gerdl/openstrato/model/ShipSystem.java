package org.gerdl.openstrato.model;

import java.util.List;
import java.util.Vector;

import org.gerdl.utils.Vec2D;

public abstract class ShipSystem {
	
	// convenience:
	protected Ship myship;
	protected Sim  mysim;
	
	protected List<SystemTile> space = new Vector<SystemTile>();
	protected int              dx,dy;  // system's coordinates, relative to ship zero.
	
	// physics:
	double mass;
	double dir = 0;   // A system can be built in any direction.
	Vec2D lPos = new Vec2D();      // local position
	Vec2D wPos = new Vec2D(); 
	
	
	public ShipSystem(Ship _myship, Sim _mysim) {
		myship = _myship;
		mysim  = _mysim;
		
		dx=0; dy=0;
	}

	// retrieve local position, in ship coordinates
	public Vec2D getlPos() {return lPos;}
}
