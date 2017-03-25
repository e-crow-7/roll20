var CONTROL_PANEL = CONTROL_PANEL ? CONTROL_PANEL : {};

(function() {
    
    // create the database object.
    if(!S.database) {
        S.database = {};
    }
    
    CONTROL_PANEL.DB = S.database;
    
    CONTROL_PANEL.name = '_CONTROL_PANEL_';
    
    CONTROL_PANEL.handout = new $.R20.Handout();
    
    /*! Should be run when the game is ready.
     */
    CONTROL_PANEL.initialize = function() {
        // Create the control panel handout if one doesnt exist.
        var r20_handout = findObjs({ type: 'handout', name: CONTROL_PANEL.name });
        
        if(r20_handout.length > 0) {
            CONTROL_PANEL.handout.set('object', r20_handout[0]);
        } else {
            CONTROL_PANEL.handout.initialize(CONTROL_PANEL.name);
        }
        
        CONTROL_PANEL.setupGMControls();
    }
    
    /*! Setup the GM control panel.
     */
    CONTROL_PANEL.setupGMControls = function() {
        var creator_html = HTML.createCategory('Create Content',
	        HTML.createButton("Create Player", "!create_player ?{New Player Name|Unnamed}") +
	        HTML.createButton("Create Character", "!create_character ?{New Character Name|Unnamed}") +
	        HTML.createButton("Create Shop", "!create_shop ?{New Shop Name|Unnamed}") +
	        HTML.createButton("Create Spell", "!create_spell ?{New Shop Name|Unnamed}") +
	        HTML.createButton("Create Item", "!create_item ?{New Item Name|Unnamed}")
	    );
	    var settings_html = HTML.createCategory('Settings',
	        'Nothing Here Yet.'
	    );
	    CONTROL_PANEL.handout.set('gmnotes', creator_html + settings_html);
    }
    
    /*! Get the player ids of this game's GMs.
     *
     * GMs are determined by who can edit the control panel's handout.
     */
    CONTROL_PANEL.getGMs = function() {
        var string_playerids = CONTROL_PANEL.handout.get('controlledby');
        var playerids =  string_playerids ? string_playerids.split(',') : [];
        return playerids;
    }
    
    CONTROL_PANEL.save = function(object) {
        
    }
    
    CONTROL_PANEL.delete = function(object) {
        
    }
    
}());