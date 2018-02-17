'use strict';

const Alexa = require('alexa-sdk');
const OWJS = require('overwatch-js');

const APP_ID = undefined;

const SKILL_NAME = 'alexa-game-status-checker-skill';
const HELP_MESSAGE = 'You can say Alexa, ask game state checker what Overwatch level is Cronos86';
const HELP_REPROMPT = 'How can I make you smile?';
const STOP_MESSAGE = 'Goodbye! I will miss you so very much.';

const handlers = {
    'LaunchRequest': function () {
        this.emit('GameStatusChecker');
    },
    'GameStatusCheckerIntent': function () {
        this.emit('GameStatusChecker');
    },
    'GameStatusChecker': function () {
        //Grab the synonym
        const synonym = this.event.request.intent.slots.Gamer
        .resolutions.resolutionsPerAuthority[0]
        .values[0].value.name.toLowerCase();

        //Query OWJS
        OWJS
        .search(synonym)
        .then((data) => {
          var message = synonym + " is level " + data[0].level;
          this.response.speak(message);
          this.emit(':responseReady');
        } );
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
};

exports.handler = function (event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
