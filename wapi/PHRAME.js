// Created by ecrow
// Script originally for web design. Might notice some code for that still lingering.

// Declared main PHRAME namespace
var PHRAME = {};

(function(){
	// Master object contains all functions of every class definition.
	PHRAME.Master = function(){};
	PHRAME.Master.prototype._instances = [5,6,9];
	// Namepaces
	PHRAME.Cache = {}; // Used for caching various selections of instances.
	PHRAME.Math = {}; // Math classes and functions
	
	// Other PHRAME vars
	PHRAME.instances = []; // Instances by ID.
	PHRAME.Cache.catInstances = {}; // Instances by PHRAME classes.
	PHRAME.Cache.pheInstances = []; // Instances that are only PHRAME.DOM
	
	// Creates a new clone of an object (sometimes pass by reference isn't desirable)
	PHRAME.clone = function(obj){
		var rtnObj = {};
		for(var p in obj){
			switch(typeof(obj[p])){
				case 'undefined': rtnObj[p] = undefined; break;
				case 'boolean': rtnObj[p] = Boolean(obj[p]); break;
				case 'number': rtnObj[p] = Number(obj[p]); break;
				case 'string': rtnObj[p] = String(obj[p]); break;
				case 'object':
					if(Object.prototype.toString.call(obj[p]) === '[object Array]'){
						rtnObj[p] = obj[p].slice(0);
					}else if(obj[p] === null){
						rtnObj[p] = null;
					}else{
						rtnObj[p] = PHRAME.clone(obj[p]);
					}
				// Untested (too lazy right now)
				/*case 'function':
					rtnObj[p] = function(){ return(obj[p].apply(this, arguments); }*/
				break;
			}
		}
		return(rtnObj);
	};
	
	// Creates a new clone of an object and places the clone into another object
	PHRAME.cloneInto = function(inObj, fromObj){
		for(var p in fromObj){
			switch(typeof(fromObj[p])){
				case 'undefined': inObj[p] = undefined; break;
				case 'null': inObj[p] = null; break;
				case 'boolean': inObj[p] = Boolean(fromObj[p]); break;
				case 'number': inObj[p] = Number(fromObj[p]); break;
				case 'string': inObj[p] = String(fromObj[p]); break;
				case 'object':
					if(Object.prototype.toString.call(fromObj[p]) === '[object Array]'){
						inObj[p] = fromObj[p].slice(0);
					}else if(fromObj[p] === null){
						inObj[p] = null;
					}else{
						inObj[p] = PHRAME.clone(fromObj[p]);
					}
				break;
			}
		}
	};
	
	// Checks if an object is an array
	PHRAME.isArray = function(val){
		if(Object.prototype.toString.call(val) === '[object Array]'){
			return(true);
		}
		return(false);
	};
	
	// Define the class extension function.
	// STRING name = Name of the class.
	// OBJECT object = the class object.
	PHRAME.Class = function(param){
		
		// Check for namespaces in the class name.
		var classPath = param.name.split('.');
		
		// Create constructor
		var constructFunc = function(options){
			
			this.$ = this;
			if(this._super != null){this._super.$ = this;}
			
			var cateName = this.classFullName;
			PHRAME.Cache.catInstances[cateName] = PHRAME.Cache.catInstances[cateName] || [];
			PHRAME.Cache.catInstances[cateName].push(this);
			
			if(this.className != 'Style'){
				PHRAME.Cache.pheInstances.push(this);
			}
			
			PHRAME.instances.push(this);
			this.instanceID = (PHRAME.instances.length - 1);
			
			// Create the properties if their defined for this "class"
			if(this._properties != null){
				 PHRAME.cloneInto(this, this._properties);
			}
			
			if(this._construct != null){
				if(options == null){options = {};}
				this._construct(options);
			}
		};
		
		// Store the PHRAME namespace as the "Current Namespace" (cN).
		// Every time we go further into the namespace, we push this out.
		// May be a bit confusing, but the comments in the loop should help.
		var cN = PHRAME;
		// This will be defined as the "Current Object" (cO).
		var cO = null;
		// Loop through the classPath and check/create namespaces and the object.
		for(var i=0; i < classPath.length; i++){
			// Store the current index into a more manageable name.
			var cP = classPath[i];
			// If this is the last item in the classPath array,
			// Let's now create the actual object
			if(i === (classPath.length-1)){
				// Now to create the object in the current working namespace.
				cN[cP] = constructFunc;
				// Define the prototype.
				cO = cN[cP].prototype;
				// Set class info
				cO.className = cP;
				cO.classFullName = param.name;
				cO._properties = {};
				
				break;
			}else{
				// Check if the namespace doesn't exist.
				if(typeof(cN[cP]) === 'undefined'){
					// Add the new namespace to the current one we're on.
					cN[cP] = {};
				}
				// This next line pretty much makes the next namespace our working one.
				cN = cN[cP];
			}
		}
		
		// Add the object properties
		if(typeof(param.properties) === 'object'){
			// Place the object from the parameter into an object (does that make sense? mmm)
			var obj = param.properties;
			// loop through the object and add the objects.
			for(var p in obj){
				// Add all properties to the "class"
				cO._properties[p] = obj[p];
			}
		}
		
		var pM = PHRAME.Master.prototype;
		// Add the object methods
		if(typeof(param.methods) === 'object'){
			// Place the object from the parameter into an object (again, does that make sense? mmm)
			var obj = param.methods;
			// loop through the object and add the objects.
			for(var p in obj){
				// Add all methods to the "class"
				cO[p] = obj[p];
				// Add methods to the master object
				if(pM[p] == undefined){
					// Add the function to the Master object.
					pM[p] = createMasterFunc(p);
					pM[p].prototype.named = p;
				}
			}
		}
		
		// Check for extended PHRAME Classes
		if(param.extend == undefined){ return; }
		// Split the extended PHRAME Class path
		var path = param.extend.split('.');
		// Start the current namespace which will eventually be the object to extend.
		var ext = PHRAME;
		// Loop until we get our extended object.
		for(var i=0; i < path.length; i++){
			// More manageable name for the current path index.
			var p = path[i];
			// Loop to the next namespace.
			ext = ext[p];
		}
		
		// Ensure we found the function. Exit, otherwise.
		if(typeof(ext) !== 'function'){ return; }
		var eobj = ext.prototype;
		
		// Reset/Declare _super object.
		cO._super = {};
		// loop through the object and add the objects.
		for(var p in eobj){
			// Always add the extended object's properties to cO's super.
			cO._super[p] = eobj[p];
			// If the property doesn't already exist.
			if(cO[p] == undefined){
				// Add this property to the object.
				cO[p] = eobj[p];
			// If the property we're trying to copy are properties, clone them
			// into this new "class"
			}else if(p === '_properties'){
				PHRAME.cloneInto(cO[p], eobj[p]);
			}
		}
	};
	
	// Select function returns a PHRAME.Master.prototype object with the number of instances. All parameters can be in array form.
	// PHRAME.select(object); Example: PHRAME.select({ e : "div", i : "Widget" });
	// NOTE: Order of filters does matter.
	// n = namespace of... (Example: "n: 'PHRAME.DOM'" - selects all existing objects instantiated from "classes under DOM namespace)
	// i = instance of... (Example: "i: 'Element'" - selects all objects that is a direct instance of the 'Element')
	// e = DOM element of... (Example: "e: 'div'" - selects all objects that are of DOM type, and who's element is set to be a 'div')
	// s = Has styling... (Example:
	// a = Has attribute... (Example:
	PHRAME.select = function(filter){
		// Start our set with all instances.
		var currentSet = PHRAME.instances;
		// Start the filter loop to narrow our set of instances we want to return.
		for(var type in filter){
			// Stores the next set of objects.
			var newSet = [];
			// filter by instance type.
			if(type === 'i' || type === 'instance'){
				for(var i=0; i<currentSet.length; i++){
					// Search through the array of filter parameters
					if(typeof(filter[type]) === 'object'){
						for(var j=0; j<filter[type].length; j++){
							if(currentSet[i].className === filter[type][j]){
								newSet.push(currentSet[i]);
							}
						}
					// Otherwise, filter through value.
					}else{
						if(currentSet[i].className === filter[type]){
							newSet.push(currentSet[i]);
						}
					}
				}
			}
			// filter by element type.
			if(type === 'e' || type === 'element'){
				for(var i=0; i<currentSet.length; i++){
					// Ensure we're dealing with an object that actually has an element
					if(currentSet[i].getElement != null){
						// Search through the array of filter parameters
						if(typeof(filter[type]) === 'object'){
							for(var j=0; j<filter[type].length; j++){
								if(currentSet[i].getElement().tagName === filter[type][j].toUpperCase()){
									newSet.push(currentSet[i]);
								}
							}
						// Otherwise, filter through value.
						}else{
							if(currentSet[i].getElement().tagName === filter[type].toUpperCase()){
								newSet.push(currentSet[i]);
							}
						}
					}
				}
			}
			// assign the currentSet as the newSet to return or to further filter.
			currentSet = newSet;
		}
		// Shorten up PHRAME.Master.prototype
		var m = PHRAME.Master.prototype;
		// Set the instances in the Master prototype.
		m._instances = currentSet;
		// Return the Master prototype.
		return(m);
	};
	
	// Object Extensions
	Array.prototype.pushUnique = function(value){
		var found = false;
	    for(var i=0; i<this.length; i++){
	    	var a = this[i];
	    	if(a === value){
	    		found = true;
	    		break;
	    	}
	    }
	    
	    if(found === false){this.push(value);}
	};
	
	// This function allows us to pass the Function Name variable (fN) without the variable changing from outside.
	var createMasterFunc = function(fN){
		return (
			function(){
				var i = this._instances;
				for(var j=0; j<i.length; j++){
					if(i[j][fN] != undefined){
						i[j][fN].apply(i[j], arguments);
					}
				}
			}
		);
	};
	
}());

// Make the objects global.
var $ = PHRAME;

// Create a new persistent state
if(! state.FoxModule ) {
    state.FoxModule = {
        version: 1.0
    };
}

var S = state.FoxModule;