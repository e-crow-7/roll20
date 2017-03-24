var LOG = LOG ? LOG : {};

(function() {
  
    var $ = LOG;
    
    $._mask = 31;

    $.O = {
        DEBUG: 1,
        INFO:  2,
        WARN:  4,
        ERROR: 8,
        FATAL: 16
    }
    
    /* @brief Set what types of logs should be outputted.
     *
     * @param flags The Log.O flags.
     *        Example: LOG.outputMask(LOG.O.DEBUG | LOG.O.WARN | LOG.O.ERROR);
     */
    $.outputMask = function(flags) {
        $._mask = flags;
    }

    /* @brief Outputs a date-time string.
     *
     * @return A string with the date and time.
     */
    $.getDateTimeString = function() {
        var currentdate = new Date();
        var datetime = currentdate.getDate() + "/"
            + (currentdate.getMonth()+1)  + "/" 
            + currentdate.getFullYear() + " @ "  
            + currentdate.getHours() + ":"  
            + currentdate.getMinutes() + ":" 
            + currentdate.getSeconds();
        return datetime;
    }
    
    /* @brief Outputs a debug log.
    */
    $.Debug = function(text) {
        if(!($._mask & $.O.DEBUG)) { return; }
        log("DEBUG: " + text);
    }
    
    /* @brief Outputs an info log.
    */
    $.Info = function(text) {
        if(!($._mask & $.O.INFO)) { return; }
        log("INFO: " + text);
    }
    
    /* @brief Outputs a warn log.
    */
    $.Warn = function(text) {
        if(!($._mask & $.O.WARN)) { return; }
        log("WARN: " + text);
    }
    
    /* @brief Outputs an error log.
    */
    $.Error = function(text) {
        if(!($._mask & $.O.ERROR)) { return; }
        log("ERROR: " + text);
    }
    
    /* @brief Outputs a fatal log.
    */
    $.Fatal = function(text) {
        if(!($._mask & $.O.FATAL)) { return; }
        log("FATAL: " + text);
    }
    
}());