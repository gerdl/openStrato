package org.gerdl.openstrato.model.shipsystems;

import org.gerdl.openstrato.model.Ship;
import org.gerdl.openstrato.model.ShipSystem;
import org.gerdl.openstrato.model.Sim;
import org.gerdl.openstrato.model.SystemTile;

public class CommandCenter extends ShipSystem{
	
	public CommandCenter(Ship _myship, Sim _mysim) {
		super(_myship, _mysim);
		
		// A single tile taken up by our gorgeous command center:
		space.add( new SystemTile(0, 0) );
		
	}

}
