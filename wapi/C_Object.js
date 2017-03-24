(function(){
	$.Class({name: 'R20.Object',
		properties: {
		},
		methods: {
			/*! Constructor
			 */
			_construct: function(/*Object*/options){		
				var t = this.$;
			},
			
			/*! Sets a property
             *
             * @param property The name of the property.
             * @param value The value to set the property to.
             */
            set: function(property, value) {
                var t = this.$;
                
                if(!t._properties.hasOwnProperty(property)) {
                    LOG.Error(t.className + " does not have property " + property);
                    return;
                }
                if(typeof(t._properties[property]) !== typeof(value)) {
                    LOG.Error(t.className + " cannot set property of type " + typeof(t._properties[property]) + " to " + typeof(value));
                    return;
                }
                
                t[property] = value;
            },
            
            /*! Gets a property
             *
             * @param property The name of the property.
             * @return The value of the property or null.
             */
            get: function(property) {
                var t = this.$;
                
                if(!t._properties.hasOwnProperty(property)) {
                    LOG.Error(t.className + " does not have property " + property);
                    return;
                }
                
                return t[property];
            },
			
			/*! Returns an object containing all the properties of this object.
			 */
			marshal: function() {
			    var t = this.$;
			    
			    var marshal_object = {};
			    
			    for(var p in t._properties) {
				    marshal_object[p] = t[p];
				}
				
				return marshal_object;
			},
			
			/*! Loads in a marshalled object.
			 */
			unmarshal: function(marshal_object) {
			    var t = this.$;
			    
			    for(var p in marshal_object) {
				    if(t._properties.hasOwnProperty(p)) {
				        t[p] = marshal_object[p];
				    }
				}
			},
			
		}
	});
}());