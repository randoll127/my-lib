import Log from './log.js';
let logger;

var initLogger = function(level='info',stream){
    if(arguments.length==2){
        logger= new Log(level,stream);
    }else{
        logger= new Log(level);
    }

    logger.logError = function(msg){
        this.error(msg);
    }
    logger.logInfo = function(msg){
        this.info(msg);
    }
    logger.logCri = function(msg){
        this.critical(msg);
    }

    logger.close = function(){
        stream.end();
    }

    return logger;
}


export default {
    initLogger
}