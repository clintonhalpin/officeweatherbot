var Botkit = require('botkit');
var controller = Botkit.slackbot();
var request = require('request');

var env = process.env.NODE_ENV || 'development';
var config = require('./etc/.env' + (env ? '.' + env : '') + '.js');

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
    request('https://slack.com/api/users.info?token='+config.token+'&user='+message.user, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(body); 
        bot.startConversation(message, talkAboutTheWeather);
      }
    });
});

var talkAboutTheWeather = function(response, convo) {
//    console.log(convo);
    convo.say('How about that weather today?');
};


