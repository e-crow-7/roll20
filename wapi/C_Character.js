(function(){
	$.Class({name: 'R20.Character', extend: 'R20.Object',
		properties: {
			r20_character:	{}, //! Roll20 Character Object.
			handout_controls :  {}, //! Roll20 Handout containin character controls.
		},
		methods: {
			/*! Constructor
			 */
			_construct: function(/*Object*/options){		
				var t = this.$;
				
				t._super._construct(options);
			},
			
			/*! Instatiates a new character.
			 */
			initialize: function(name) {
			    var t = this.$;
			    
			    if(!_.isEmpty(t.r20_character)) {
                    LOG.Error("R20 character has already been instantiated or set.");
                    return false;
                }
                if(!(t.r20_character = createObj('character', {}))){
                    LOG.Error("R20 character could not be created for some unknown reason.");
                    return false;
                }
                t.handout_controls = new $.R20.Handout();
                t.handout_controls.initialize();
                
                t.set('name', name ? name : "Unnamed");
                t._setupGMControls();
                
                return true;
			},
			
			/*! Setups up the GM controls.
			 */
			_setupGMControls: function() {
			    var t = this.$;
			    
			    t.set('gmnotes', '<div><strong><a href="!dchar ?{Are you sure you want to delete?|No,0|Yes,1}">DELETE</a><strong></div>');
			},
			
			/*! Sets a property
             *
             * @param property The name of the property.
             * @param value The value to set the property to.
             */
            set: function(property, value) {
                var t = this.$;
                
                if(!_.isEmpty(t.r20_character)) {
                    if(_.contains(['notes','gmnotes','bio'], property)) {
                        t.r20_character.set(property, value);
                    } else if(t.r20_character.get(property) !== undefined) {
                        t.r20_character.set(property, value);
                        if(property == "name") {
                            t.handout_controls.set(property, ("Ctrl: " + value));
                        }
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
                
                if(!_.isEmpty(t.r20_character)) {
                    if(_.contains(['notes','gmnotes','bio'], property)) {
                        LOG.Warn("The property '" + property + "' cannot be obtained at this time.")
                    } else if(t.object.get(property) !== undefined) {
                        t.r20_character.get(property, value);
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