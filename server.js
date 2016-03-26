var Botkit = require('botkit');
var controller = Botkit.slackbot();

const env = process.env.NODE_ENV || 'development';
const config = require('./etc/.env' + (env ? '.' + env : '') + '.js');

if (!config.token) {
    console.log('Error: Specify token in environment');
    process.exit(1);
}

controller.spawn({
    token: config.token
}).startRTM(function(err){
    if(err) {
        throw new Error(err);
    }
});

var weatherPhrases = ['Nice day', 'Cold out'];

controller.hears(weatherPhrases, ['direct_message', 'direct_mention', 'mention', 'ambient'], function(bot, message) {
    console.log('holler');
    bot.startConversation(message, talkAboutTheWeather);
});

var talkAboutTheWeather = function(response, convo) {
    convo.say('How about that weather today?');
};


