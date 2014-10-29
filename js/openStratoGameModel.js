"use strict";


// //////////////////////////////////////////////////////
// //////////////////////////////////////////////////////
//                  abstract Game Class
// //////////////////////////////////////////////////////
// //////////////////////////////////////////////////////

function Game() {
    this.sim              = new Sim();
    this.constructionView = new ConstructionView();
    this.flightView       = new FlightView();
    this.graphicsSet      = new GraphicsSet();
}


// //////////////////////////////////////////////////////
// //////////////////////////////////////////////////////
//                  SystemTile Class
// //////////////////////////////////////////////////////
// //////////////////////////////////////////////////////

function SystemTile(dx,dy) {
	this.dx = dx;
	this.dy = dy;
	if (undefined === dx) this.dx = 0.0;
	if (undefined === dy) this.dy = 0.0;
};


// //////////////////////////////////////////////////////
// //////////////////////////////////////////////////////
//              abstract class ShipSystem 
// //////////////////////////////////////////////////////
// //////////////////////////////////////////////////////

function ShipSystem(myship, mysim) {
    this.myship = myship;
    this.mysim  = mysim;
	
    this.dx = 0; // relative coordinates on grid
    this.dy = 0;
    
    // physics:
    this.dir  = 0.0;   // A system can be built in any direction.
    this.lPos = new Vec2D();      // local position
    this.wPos = new Vec2D();      // world position
};

// static members:
ShipSystem.prototype.space  = [];          // type SystemTile
ShipSystem.prototype.identi = "unknown";   // has to be overwritten by actual implementations!
ShipSystem.prototype.mass   = 0.0;



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
    
    // there are no ship systems yet, so don't update center of mass, here, yet.
    //this._updateCenterOfMassAndInertia();
};

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
    
    var f   = new Vec2D();    // for linear movement: linear forces
    var tau = 0;              // for angular rotation: Calculate Torque
    
    // disposable Vect2D
    var r = new Vec2D();
    
    // calculating force f and torque tau:
    for (var s in this.systems) {
    	
    	if (s.getForceVect === undefined)
    		continue;
	
    	var ffs = s.getForceVect(); // force excerted by this component s
	
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
    
    var ax = f.x / this.totalmass;
    var ay = f.y / this.totalmass;
    this.v.add( ax*dt, ay*dt );
    // TODO: add a bit of viscosity or friction!
    this.pos.add( this.v.x*dt, this.v.y*dt ); 
    
    // but now for the rotation!
    this.w   += tau * dt / this.I;    // torque tau, Moment of inertia I
    // a bit of friction to the angular velocity!
    this.dir += this.w * dt;          // angular velocity w

    // build rotation matrix:
    
    
    //  we also have to adjust the 0-position for the rotation around the center of mass:
    //  If we rotate 12° around the cm, we have to rotate
    
    //updateGlobalCoords();

};




/**
 * when new systems are added or destroyed, we'll have to update the center of mass. 
 * @return 
 */
Ship.prototype._updateCenterOfMassAndInertia = function() {

    // center of mass, local coords:
    this.cm.set(0,0);
    this.totalmass = 0;
    for (var i in this.systems) {
    	var s = this.systems[i];
    	this.cm.x += s.dx * s.mass;
    	this.cm.y += s.dy * s.mass;
    	totalmass += s.mass;
    }
    assert( this.totalmass > 0.0 );
    this.cm.x /= totalmass;
    this.cm.y /= totalmass;

    
    // Now that we know the center of mass, we can calculate the 
    // Moment of Inertia, I:
    this.I = 0;
    for (var i in this.systems) {
    	var s = this.systems[i];
    	this.I += s.getlPos().lenSq() * s.mass;
    }
    

};





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


