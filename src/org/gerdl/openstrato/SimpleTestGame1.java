package org.gerdl.openstrato;

import org.gerdl.openstrato.model.Sim;
import org.gerdl.openstrato.model.maps.FirstSimpleTestMap;

public class SimpleTestGame1 extends Game {
	
	public SimpleTestGame1() {
		// TODO Auto-generated constructor stub
		
		map  = new FirstSimpleTestMap();
		prop = new StratoProperties();
		sim  = new Sim();
		
	}

}
