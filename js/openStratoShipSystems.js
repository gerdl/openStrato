"use strict";


// //////////////////////////////////////////////////////
// //////////////////////////////////////////////////////
//                  SmallSteeringJet Class
// //////////////////////////////////////////////////////
// //////////////////////////////////////////////////////


function SmallSteeringJet(myship, mysim) {
    ShipSystem.call(this,myship,mysim);     // extends ShipSystem

    this.fVec = new Vec2D();
};
SmallSteeringJet.prototype = new ShipSystem();

// static members:
SmallSteeringJet.prototype.mass = 10;
SmallSteeringJet.prototype.identi = "SmallSteeringJet";

SmallSteeringJet.prototype.getForceVect = function() {
    return this.fVec;
    };
