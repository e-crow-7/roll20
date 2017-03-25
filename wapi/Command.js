var SYSTEM_NAME = 'Campaign';

function getPlayerName(playerid) {
    r20_player = getObj('player', playerid);
    return r20_player.get('displayname');
}

/*! Command to create a new character.
 *
 * Characters are something with stat, action, or interactable data.
 * Command usage:
 * !create_character <name>
 */
function commandCreateCharacter(msg, argv) {
    var string_usage = "<strong>!create_character <i>name</i></strong>";
    
    // Ensure the player has permission to use the command.
    if(!_.contains(CONTROL_PANEL.getGMs(), msg.playerid)) {
        LOG.Info(msg.who + " does not have permission to use the !create_character command.");
        return false;
    }
    
    if(argv.length < 2) {
        sendChat(
            SYSTEM_NAME,
            '/w "' + getPlayerName(msg.playerid) + '"<br/>Invalid syntax.<br/><br/>USAGE:<br/>' + string_usage + '.',
            null,
            {noarchive:true}
        );
        return false;
    }
    
    var character = new $.R20.Character();
    character.initialize(argv[1]);
    
    return true;
}

on("chat:message", function(msg) {
    log(msg);
    
    if(msg.type == "api") {
        var argv = msg.content.match(/'[^']*'|"[^"]*"|\S+/g) || [];
        
        switch(argv[0]) {
            case '!create_character':
                commandCreateCharacter(msg, argv);
                break;
            case '!create_player':
                
                break;
            case '!test':
                sendChat('Game', '<a href="!completelydifferent ?{Name|Unnamed}">Click this thing here</a>');
                break;
            case '!completelydifferent':
                sendChat('Game', 'Value was: ' + argv[1]);
                break;
            default:
                sendChat(SYSTEM_NAME, '/w "' + getPlayerName(msg.playerid) + '"<br/>Unknown command.', null, {noarchive:true});
                break;
        }
    }
});

