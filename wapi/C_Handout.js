(function(){
	$.Class({name: 'R20.Handout', extend: 'R20.Object',
		properties: {
			object:	{}, //! Roll20 Handout Object.
		},
		methods: {
			/*! Constructor
			 */
			_construct: function(/*Object*/options){		
				var t = this.$;
				
				t._super._construct(options);
			},
			
			/*! Creates a new handout in R20.
			 *
			 * @param title The title to give the handout.
			 */
			initialize: function(title) {
			    var t = this.$;
			    
                if(!_.isEmpty(t.object)) {
                    LOG.Error("R20 handout has already been instantiated or set.");
                    return false;
                }
                if(!(t.object = createObj('handout', {}))){
                    LOG.Error("R20 handout could not be created for some unknown reason.");
                    return false;
                }
                t.set('name', title ? title : "Untitled");
            },
            
            /*! Loads in the data a R20 handout object.
             *
             * @param object The R20 handout object.
             */
            setR20Object: function(object) {
                var t = this.$;
                
                // Ensure it's actually a handout object.
                if(object.get("_type") !== "handout") { return; }
                
                // Update the properties.
                t.object = object;
            },
            
            /*! Gets the R20 object.
             *
             * @return The R20 handout object.
             */
            getR20Object: function() {
                var t = this.$;
                
                if(t.object == null) {
                    LOG.Error("Cannot return a uninstantiated/unset R20 handout.");
                    return null;
                }
                
                return t.object;
            },
            
            /*! Sets a property
             *
             * @param property The name of the property.
             * @param value The value to set the property to.
             */
            set: function(property, value) {
                var t = this.$;
                
                if(!_.isEmpty(t.object)) {
                    if(_.contains(['notes','gmnotes','bio'], property)) {
                        t.object.set(property, value);
                    } else if(t.object.get(property) !== undefined) {
                        t.object.set(property, value);
                    } else {
                        t._super.set(property, value);
                    }
                } else {
                    t._super.set(property, value);
                }
            },
            
            /*! Gets a property
             *
             * @param property The name of the property.
             * @return The value of the property or null.
             */
            get: function(property) {
                var t = this.$;
                
                if(!_.isEmpty(t.object)) {
                    if(_.contains(['notes','gmnotes','bio'], property)) {
                        LOG.Warn("The property '" + property + "' cannot be obtained at this time.")
                    } else if(t.object.get(property) !== undefined) {
                        t.object.get(property, value);
                    } else {
                        t._super.get(property, value);
                    }
                } else {
                    t._super.set(property, value);
                }
            }
    
		}
	});
}());