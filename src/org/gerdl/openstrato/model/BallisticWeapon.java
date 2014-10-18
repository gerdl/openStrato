package org.gerdl.openstrato.model;

public abstract class BallisticWeapon extends Weapon {

	
	public BallisticWeapon(Ship _myship, Sim _mysim) {
		super(_myship, _mysim);
		// TODO Auto-generated constructor stub
	}

	public void fire() {
		mysim.requestProjectile();
	}
}
