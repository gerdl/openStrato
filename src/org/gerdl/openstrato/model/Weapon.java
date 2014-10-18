package org.gerdl.openstrato.model;

public abstract class Weapon extends ShipSystem {
	
	
	
	public Weapon(Ship _myship, Sim _mysim) {
		super(_myship, _mysim);
		// TODO Auto-generated constructor stub
	}

	double minDist;
	double maxDist;
	
	IDestroyable target;
	 
	
	public void setTarget(IDestroyable _target) {
		target = _target;
	}
	
	abstract public void fire();

}
