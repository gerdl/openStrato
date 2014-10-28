// //////////////////////////////////////////////////////
// //////////////////////////////////////////////////////
//                  SystemTile Class
// //////////////////////////////////////////////////////
// //////////////////////////////////////////////////////

function SystemTile(dx,dy) {
	this.dx = dx;
	this.dy = dy;
};


// //////////////////////////////////////////////////////
// //////////////////////////////////////////////////////
//                  ShipSystem Class
// //////////////////////////////////////////////////////
// //////////////////////////////////////////////////////

function ShipSystem(myship, mysim) {
	this.myship = myship;
	this.mysim  = mysim;
	
	this.space = [];  // type SystemTile
	
	ShipSystem.prototype.dx = 0; // relative coordinates on grid
	ShipSystem.prototype.dy = 0;
	
	// physics:
	this.mass = 0.0;
	this.dir  = 0.0;   // A system can be built in any direction.
	this.lPos = new Vec2D();      // local position
	this.wPos = new Vec2D();      // world position
};




// //////////////////////////////////////////////////////
// //////////////////////////////////////////////////////
//                  Ship Class
// //////////////////////////////////////////////////////
// //////////////////////////////////////////////////////

function Ship (sim) {
    this.sim = sim;

    this.systems = [];  // type ShipSystem

    // economy:
    this.res = new Resource();

    // static physics: const as long as the ship design is not changing: 
    this.cm  = new Vec2D();     // cm, center of mass in local coords
    this.totalmass = 0.0;  
    this.I         = 0.0; 	   // Moment of inertia

    // dynamic physics: Changes at every timestep:
    this.pos = new Vec2D();     // position in the world coord system
    this.v   = new Vec2D();  // speed of the cm
    this.dir = 0.0;    // angle
    this.w   = 0.0;      // angular velocity
    
    
    this.updateCenterOfMassAndInertia();
}

// ship systems:



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
Ship.prototype.update = function(dt) {
    
    //updateEconomy();
    
    //updateControllers();
    
    // / / / / / / / / / / / /  
    // updateForces();
    
    Vec2D  f   = new Vec2D();    // for linear movement: linear forces
    double tau = 0;              // for angular rotation: Calculate Torque
    
    // disposable Vect2D
    Vec2D r = new Vec2D();
    
    // calculating force f and torque tau:
    for (s in this.systems) {
    	
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
    
    // but now for the rotation!
    w   += tau * dt / I;    // torque tau, Moment of inertia I
    // a bit of friction to the angular velocity!
    dir += w * dt;          // angular velocity w

    // build rotation matrix:
    
    
    //  we also have to adjust the 0-position for the rotation around the center of mass:
    //  If we rotate 12° around the cm, we have to rotate
    
    //updateGlobalCoords();

};




/**
 * when new systems are added or destroyed, we'll have to update the center of mass. 
 * @return 
 */
Ship.prototype.updateCenterOfMassAndInertia = function() {

    // center of mass, local coords:
    this.cm.set(0,0);
    this.totalmass = 0;
    for (var s in this.systems) {
    	this.cm.x += (double)s.dx * s.mass;
    	this.cm.y += (double)s.dy * s.mass;
    	totalmass += s.mass;
    }
    assert( this.totalmass > 0.0 );
    this.cm.x /= totalmass;
    this.cm.y /= totalmass;

    
    // Now that we know the center of mass, we can calculate the 
    // Moment of Inertia, I:
    this.I = 0;
    for (var s in this.systems) {
    	this.I += s.getlPos().lenSq() * s.mass;
    }
    

}





// //////////////////////////////////////////////////////
// //////////////////////////////////////////////////////
//                  Resource Class
// //////////////////////////////////////////////////////
// //////////////////////////////////////////////////////


function Resource (silicon,metal,energy) {
    this.silicon = silicon;
    this.metal   = metal;
    this.energy  = energy;
};


